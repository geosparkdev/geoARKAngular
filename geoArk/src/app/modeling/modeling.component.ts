import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

//Third Party Packages 
import * as L from 'leaflet';
import * as colormap from 'colormap';



//Risk factors map and geoJSON object
var actual_map;
var model_map;
var geoJSON;
var info;
var map_status=0;


@Component({
  selector: 'app-modeling',
  templateUrl: './modeling.component.html',
  styleUrls: ['./modeling.component.css']
})
export class ModelingComponent implements OnInit {


  public category:any='Susceptible'
  public mobility:any='yes'

  public covid_attr:any='covid_cases_'
  public model_attr:any= this.mobility+'_'+this.category+'_'

  public current_date:any;

  public date_attr:any;
  public map_metadata:any;


  constructor(public http: HttpClient,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMapdata();
  }



  getMapdata(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.get(environment.base_url+"5000/getpredictions", {headers: customheaders}).subscribe(
      response=> {
        console.log(response)
        this.date_attr=response[0];
        this.map_metadata=response[1];
        geoJSON=response[2];

        console.log('IN MAP DATA FXN')
        console.log(this.date_attr);
        console.log(this.map_metadata);
        console.log(geoJSON);

        this.current_date=this.date_attr[this.date_attr.length-1]
        console.log(this.current_date)
        console.log("OUT OF MAP DATA FXN")

      },
      error => {
        console.log(error)
      }
    )

  }





  model_map(){

    console.log("IN MODEL MAP")
    let mob_data=this.map_metadata.filter(e=> e['mobility']===this.mobility)
    let mob_cat_data=mob_data.filter(e=> e['category']===this.category)
    
    var attribute=this.model_attr+this.current_date
    console.log("ATTRIBUTE")
    console.log(attribute)

    var min=0;  
    var threshold=200;

    var colorrange=colormap({
      colormap:'portland',
      nshades:threshold,
      format: 'hex',
      alpha: 1
  })

  

  var ranges= getBin(min,mob_cat_data.max,200);

  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
  {
    id: "mapbox.light",
    attribution: "SOS"
    // can have min and max zoom here
  }).addTo(model_map);


  // info block
  info = new L.Control({position: 'bottomleft'});
  info.onAdd = function () {
    if(map_status==0){
      this._div = L.DomUtil.create("div", "info");
      map_status=1;
    }
    else
    {

      this._div=document.getElementsByClassName("info")[0];

    }
      this.update();
      return this._div;
    };

   //info box display
    info.update = function (props: any) {
      this._div.innerHTML =
        (props ? "<b>County: </b>": "<h4>Click to see details of another county.</h4>");
    };
    info.addTo(model_map);



  //geoJSON object and coloring of county
  geoJSON= L.geoJSON(geoJSON, {
    style: function (feature) {
      return{
        color: 'black',
        weight: 0.5,
        //fillColor:getcolor(feature.id),
        fillColor:getcolor3(feature.properties[attribute]),
        fillOpacity:0.8,
      }
    },
    onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
  }).addTo(model_map);






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




  function getcolor3(value){


    //light to dark
    var color;

    for(var i=(threshold-1); i>=min; i--)
    {
      if(value>=ranges[i])
      {
        color= colorrange[i];
   
        break;
      }
    }

    return color
  }



}




// map functions 
highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 2,
    color: "black",
    fillOpacity: 1.0
  });
  if (!L.Browser.ie && !L.Browser.edge) {
    //layer.bringToFront();
  }
  info.update(layer.feature.properties);
}

 onEachFeature(feature, layer: L.Layer) {
  layer.on({
    mouseover: this.highlightFeature,
    mouseout: this.resetHighlight,
    //click: (event) => this.getCountyDataClick(event),
  });
}

resetHighlight(e) {
  geoJSON.resetStyle(e.target);
  info.update();
}

/*zoomToFeature(e) {
  risk_map.fitBounds(e.target.getBounds());
}*/

onOutlineEachFeature(feature, layer: L.Layer) {
  layer.on({
  });
}




}
