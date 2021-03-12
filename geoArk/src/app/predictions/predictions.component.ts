//Core Packages
import { Component, Input, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import { environment} from 'src/environments/environment';
import { interval, Subscription} from 'rxjs';


//Models
import { categories} from '../models/categories';
import { subcategories} from '../models/subcategories';

//Third Party Packages 
import * as L from 'leaflet';
import { Options,ChangeContext } from 'ng5-slider';
import { NgxSpinnerService } from "ngx-spinner";
import * as colormap from 'colormap';
import { features } from 'process';



@Component({
  selector: 'app-predictions',
  templateUrl: './predictions.component.html',
  styleUrls: ['./predictions.component.css']
})
export class PredictionsComponent implements OnInit {

  public model_butt:any='yes';
	public cat_butt:any='Susceptible';
 	public subtitle:any=''

	public initial_params:any=['yes','Susceptible']
// map variables
  public geojson_obj:any=[];
  public legend:any=[];
  public map:any;
  
  public dataset1:any;
  public data_selected:any;
  public min:any;
  public max:any=0;
  public threshold:any;



	//Loading map variables
  public loading_togg:boolean=false;
  

	
  //Slider variables
  public slider_togg: boolean=false;
  public value: number=0;
  public options: Options={
	floor: 0,
	ceil: 0,
	showSelectionBar: true,
  selectionBarGradient: {
	from: '#fcfed3',
	to: '#00b300'
},

	translate: (value: number): string => {
			return this.legend[value]['keys']
	}
}
  
    
  public play_selected:boolean=false;
  public slider_interval: Subscription;

  tags:string;


  constructor(public http: HttpClient,private spinner: NgxSpinnerService,private route:ActivatedRoute) { }

  ngOnInit(): void {


	//this.getTestData();
	this.getModelData(this.initial_params);



}

	//functions for loading screen 
	startLoading(){
		this.loading_togg=true;
		this.spinner.show();
	}

	stopLoading(){
		this.loading_togg=false;
		this.spinner.hide()
	}

	getModelData(params:any){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.post(environment.base_url+"/getModelingData",JSON.stringify(params), {headers: customheaders}).subscribe(
      response=> {
		console.log(response)

		this.geojson_obj=response[0];
        this.legend=response[1];
        console.log("TEST")
    
        this.map = L.map("map").setView([37.9643, -91.8318], 6.2);
        
		this.min=this.legend[this.legend.length-1]['min']
		this.max=this.legend[this.legend.length-1]['max']
		console.log(this.max)
        this.threshold=1000

		this.getMap(this.legend[this.legend.length-1]['keys'],0);
		this.subtitle=this.cat_butt;
    
        this.options.ceil=this.legend.length-1;
        this.value=this.legend.length-1;
        
        this.slider_togg=true;



      },
      error => {
        console.log(error)
      }
    )
    
	}
	
	mob_click(){
		this.map.removeLayer(L.GeoJSON);
		this.cat_butt=''
		this.subtitle=this.cat_butt;
	
	}

 	model_click(){
		this.map.removeLayer(L.GeoJSON);
		this.updateModelData([this.model_butt,this.cat_butt])

	 }
		
 
	
	 updateModelData(params:any){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.post(environment.base_url+"/getModelingData",JSON.stringify(params), {headers: customheaders}).subscribe(
      response=> {
		console.log(response)
				

		this.geojson_obj=response[0];
        this.legend=response[1];
        console.log("TEST")
    
        
        this.min=this.legend[this.legend.length-1]['min']
        this.max=this.legend[this.legend.length-1]['max']
        this.threshold=1000

				
		this.getMap(this.legend[this.legend.length-1]['keys'],1);
		this.subtitle=this.cat_butt;
    
        this.options.ceil=this.legend.length-1;
        this.value=this.legend.length-1;
        
        this.slider_togg=true;



      },
      error => {
        console.log(error)
      }
    )
    
  }

  





  changeDataset(index:number){
    this.map.removeLayer(L.GeoJSON);
    this.data_selected=this.legend[index].attr_label
    this.min=this.legend[index].min
    this.max=this.legend[index].max
  

		this.getMap(this.data_selected,1)
		
  }





// update map when slider moves
	onUserChange(changeContext: ChangeContext): void {
		this.map.removeLayer(L.GeoJSON);
		this.getMap(this.legend[changeContext.value]['keys'],1)
		
  }



	//play and stop button 
	playSlider(){
    this.play_selected=true;
		//for(let i=0; i<=this.legend.length-1; i++){
			
		let value=interval(500);
		let key=0
		this.slider_interval=value.subscribe( () => {
			console.log(key)

			if (key >= this.legend.length-1){
				this.stopSlider()
			}
			this.value=key
			this.getMap(this.legend[key]['keys'],1)
			key+=7
		})
	
				
	}
	

  stopSlider(){
		this.slider_interval.unsubscribe()
    this.play_selected=false;
  }

  // choropleth map
  getMap(attribute:string, num:number){

	
		//map background layer--
		L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
		{
			id: "mapbox.light",
			attribution: "SOS"
			// can have min and max zoom here
		}).addTo(this.map);


			//legend -- start	
			let legend;
			let max_title= String(this.max)
			legend = new L.Control({position: 'topright'});
			legend.onAdd = function () {
        

        if(num==0){
          this._div = L.DomUtil.create("div", "legend legendcontainer");
				}
				else
				{

					this._div=document.getElementsByClassName("legend legendcontainer")[0];

				}

				this.update();
				return this._div;
			};
	
			legend.update = function () {
				this._div.innerHTML = 'Cases<br> <div id="colors"> </div> <div id="range">'+max_title+'</div>'//+
										/*'<div id="range">'+
										('<div class="ind_range">Range 1</div>'+
										'<div class="ind_range"> <span class="range_bottom"> Range 2 </span> </div>'+
										'<div class="ind_range"> <span class="range_bottom"> Range 3 </span> </div>'+
										'<div class="ind_range"> <span class="range_bottom"> Range 4 </span> </div>'+
										'<div class="ind_range"> <span class="range_bottom"> Range 5 </span> </div>'+
										'<div class="ind_range"> <span class="range_bottom"> Range 6 <br><br>0</span> </div>'+
										'</div>')*/;
			};
	
			legend.addTo(this.map);

			//informatin box--start


			let info;
			info = new L.Control({position: 'bottomleft'});
			info.remove();

			info.onAdd = function (map) {

				if(num==0){
					this._div = L.DomUtil.create("div", "info");
				}
				else
				{

					this._div=document.getElementsByClassName("info")[0];

				}
					this.update();
					return this._div;
				};



				info.update = function (props: any) {
					this._div.innerHTML =
						"<h4>Hover over a county</h4>" +
						(props ? "<b>County: </b>" +props.NAME + "<br><b>Predicted Cases: </b>"+props[attribute] + "<br/>" : "");
				};
				info.addTo(this.map);


			
		var min=this.min;
		var max=this.max;
		var threshold=500;
		//light to dark
		var colorrange=colormap({
			  colormap:'summer',
			  nshades: threshold,
			  format: 'hex',
			  alpha: 1
		  })

		colorrange.reverse();
		var ranges= getBin(min,max,threshold);
		gradientLegend(colorrange,ranges);



		//add data layer
		let geojson: L.GeoJSON;
		geojson = L.geoJSON(this.geojson_obj, {
				style: function (feature) {


					return{
						color: 'black',
						weight: 1,
						fillColor:getColor2(min,max,threshold,feature.properties[attribute],colorrange,ranges),
						//fillColor:colorrange[feature.properties[test]],
						fillOpacity:0.8,
					}

				},


				onEachFeature: function onEachFeature(feature, layer: L.Layer) {
					layer.on({
						mouseover: highlightFeature,
						mouseout: resetHighlight,
						click: zoomToFeature
					});
				}
			}).addTo(this.map);
		

		function highlightFeature(e) {
			const layer = e.target;
			layer.setStyle({
				weight: 3,
				color: "black",
				fillOpacity: 1.0
			});
			if (!L.Browser.ie && !L.Browser.edge) {
				layer.bringToFront();
			}
			info.update(layer.feature.properties);
		}


		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			this.map.fitBounds(e.target.getBounds());
		}


		// Functions for color and threshold 
		function getBin(min,max,threshold)
		{
		
			var multiple=max/threshold
			var bins=[];
			for (var i=min; i<max; i+=multiple)
			{
				bins.push(i)
			}
		
			return bins
		}

		
		
		function gradientLegend(colors,ranges){
			var html = [];
			var range_html=[];


			for(var i = colors.length;i>=0;i--){

				html.push("<div class='color' style='background-color:"+colors[i]+"; height:"+((i-(i-1))/colors.length*100)+"%;'></div>");
		
			}

			document.getElementById("colors").innerHTML = html.join('');
			
		}


	// final function for color and legend
		function getColor2(min,max,threshold,value, colorrange,ranges){

			var color;
			console.log('VALUE HERE')
			console.log(value)
			console.log(threshold)

			//light to dark
				
			for(var i=(threshold-1); i>=min; i--)
			{
				if(value >=ranges[i])
				{
					color= colorrange[i];
					console.log('IN HERE')
					console.log(color)
					break;
				}
			}

			return color
		}



			


	
  }


  
}


