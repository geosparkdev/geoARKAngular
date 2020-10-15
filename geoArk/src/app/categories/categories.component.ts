import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { categories} from '../models/categories';
import { subcategories} from '../models/subcategories';
import * as L from 'leaflet';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  public categories:categories; 
  public subcategories:subcategories;

  public current_categories: any;

  //subcategories
  public subcategories_togg: boolean=false;

  public map_togg: boolean=false;



  public susceptiblity_togg: boolean=false;
  public transmission_togg: boolean=false;
  public exposure_togg: boolean=false;
  public health_togg: boolean=false;
  public accessibility_togg: boolean=false;
  public socioeconomic_togg: boolean=false;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.subcategories=new subcategories();
    this.categories=new categories();
  }


  setCategory(index:number){
    this.categories=new categories();
    this.current_categories=this.categories.categories[index].name
    this.categories.categories[index].selected=true;
    this.getSubcat(this.categories.categories[index].toggle);
    console.log(this.categories.categories[index].toggle)

  }

  getSubcat( category: string){
    this.subcategories_togg=true;

    this.susceptiblity_togg=false;
    this.transmission_togg=false;
    this.exposure_togg=false;
	this.health_togg=false;
	this.accessibility_togg=false;
	this.socioeconomic_togg=false;

    if (category=='susceptiblity')
    {
      this.susceptiblity_togg=true;
    }
    else if (category=='transmission')
    {
      this.transmission_togg=true;
    }
    else if (category=='exposure')
    {
      this.exposure_togg=true;
    }
    else if (category=='health')
    {
      this.health_togg=true;
	}
	else if (category=='accessibility')
    {
      this.accessibility_togg=true;
	}
	
	else if (category=='socioeconomic')
    {
      this.socioeconomic_togg=true;
    }
  }

  setSubCat(index:number){
    this.map_togg=true;
    this.subcategories=new subcategories();
    if (this.current_categories=='Susceptibility')
    {
      this.subcategories.susceptiblity_sub[index].selected=true;
    }
    else if (this.current_categories=='Transmission')
    {
      this.subcategories.transmission_sub[index].selected=true;
    }
    else if (this.current_categories=='Exposure')
    {
      this.subcategories.exposure_sub[index].selected=true;
    }
    else if (this.current_categories=='Health resources')
    {
      this.subcategories.health_sub[index].selected=true;
    }

    setTimeout(() => {
      console.log("Ticking")
      this.getMap();
    }, 200)
  }








  // choropleth map
  getMap(){

	
	
	let geojson: L.GeoJSON;

	//initializing map -- map id matches HTML div id
	// center initial map on Missouri
	let map = L.map("map").setView([37.9643, -91.8318], 6);

	//load tile layer 
	//Can layer tiles
	L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
	{
		id: "mapbox.light",
		attribution: "SOS"
		// can have min and max zoom here
	}).addTo(map);

	//get Data http call -- this will be moved out
	this.http.get("http://localhost:5000/dbMap").subscribe((json: any) => {
		
	
	geojson = L.geoJSON(json, {
			style: function (feature) {

				let above100 = over100(feature.properties.covid_deaths)

				switch (above100) {
					case true:
						return {
							color: "#800026",
							fillColor: "#800026",
							fillOpacity: 0.5
						};
					case false:
						return {
							color: "#BD0026",
							fillColor: "#BD0026",
							fillOpacity: 0.5
						}
				}
			},


			onEachFeature: function onEachFeature(feature, layer: L.Layer) {
				layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight,
					click: zoomToFeature
				});
			}
		}).addTo(map);
	});


	//informatin box--start
	let info;
	info = new L.Control();
	info.onAdd = function () {
			this._div = L.DomUtil.create("div", "info");
			this.update();
			return this._div;
		};
		info.update = function (props: any) {
			this._div.innerHTML =
				"<h4>United States of America</h4>" +
				(props ? "<b>" + props.NAME + "</b><br />" : "");
		};
		info.addTo(map);


		
		
	//legend -- start	
	let legend;

	legend = new L.Control({position: 'bottomright'});
	legend.onAdd = function () {
		this._div = L.DomUtil.create("div", "info legend");
		this.update();
		return this._div;
	};

	legend.update = function () {
		this._div.innerHTML += '<div style="background-color: #800026; width: 15px; height: 15px;"></div> > 100 <br/>' +
								'<div style="background-color: #BD0026; width: 15px; height: 15px;"></div> < 100 <br/>';
	};

	legend.addTo(map);
	
	
	
	function over100(d) 
	{
		let deaths = Number(d);
		if(deaths > 100){
			return true;
		}
		else{
			return false;
		}
	}



		function perc2color(perc,min,max) 
		{
            var base = (max - min);
            if (base == 0) { perc = 100; }
            else {
                perc = (perc - min) / base * 100; 
            }
            var r, g, b = 0;
            if (perc < 50) {
                r = 255;
                g = Math.round(5.1 * perc);
            }
            else {
                b = 255;
                r = Math.round(510 - 5.10 * perc);
            }
            var h = r * 0x10000 + g * 0x100 + b * 0x1;
            return '#' + ('000000' + h.toString(16)).slice(-6);
		}
		


		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}
		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

		function highlightFeature(e) {
			const layer = e.target;
			layer.setStyle({
				weight: 5,
				color: "#666",
				dashArray: "",
				fillOpacity: 0.2
			});
			if (!L.Browser.ie && !L.Browser.edge) {
				layer.bringToFront();
			}
			info.update(layer.feature.properties);
		}

	
  }

}
