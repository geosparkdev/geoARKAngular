import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';

//Third Party Packages 
import * as L from 'leaflet';
import * as colormap from 'colormap';
import { Options,ChangeContext } from 'ng5-slider';
import { NgxSpinnerService } from 'ngx-spinner';



//Risk factors map and geoJSON object
var actual_map;
var model_map;
var geoJSON;
var geoJSON_actual;
var info;
var info_actual;
var map_status=0;
var map_status_actual=0;


@Component({
  selector: 'app-modeling',
  templateUrl: './modeling.component.html',
  styleUrls: ['./modeling.component.css']
})
export class ModelingComponent implements OnInit {


  public category:any='Susceptible'
  public mobility:any='yes'

  public covid_category='covid_cases'

  public covid_attr:any='covid_cases_'
  public model_attr:any= this.mobility+'_'+this.category+'_'

  public current_date:any;

  public date_attr:any=[0];
  public map_metadata:any;

  public model_map_obj:any;

// slider

  public slider_togg: boolean=false;

  public value: number=0;
  public options: Options={
    floor: 0,
    ceil: 0,
    showSelectionBar: true,

   
     translate: (value: number): string => {
         return this.date_attr[value]
     }
   }



  constructor(public http: HttpClient,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    model_map = L.map("model_map").setView([38.573936, -92.603760], 6.2);
    actual_map = L.map("actual_map").setView([38.573936, -92.603760], 6.2);
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
        this.model_map_obj=response[2];



        this.current_date=this.date_attr[this.date_attr.length-1]


        this.options.ceil=this.date_attr.length-1;
        this.value=this.date_attr.length-1;
        this.slider_togg=true;
        

        this.model_map()
        this.actual_map()


      },
      error => {
        console.log(error)
      }
    )

  }


// Map Functions

onUserChange(changeContext: ChangeContext): void {
  this.current_date=this.date_attr[changeContext.value]
  model_map.removeLayer(L.GeoJSON);
  actual_map.removeLayer(L.GeoJSON);
  this.model_map()
  this.actual_map()

 
}

// MODEL MAP --------------------------




  model_map(){

    console.log("IN MODEL MAP")
    let mob_data=this.map_metadata.filter(e=> e['mobility']===this.mobility)
 
    let filtered=mob_data.filter(e=> e['category']===this.category)
    
    var attribute=this.model_attr+this.current_date
    console.log("ATTRIBUTE")
    console.log(attribute)

    var min=0;  
    var threshold=200;

    var colorrange=colormap({
      colormap:'cdom',
      nshades:threshold,
      format: 'hex',
      alpha: 1
  })


  var ranges= getBin(min,Number(filtered[0].max),threshold);

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
      (props ? "<b>County: </b>" +props.NAME + "<br><b>Predicted Cases: </b>"+props[attribute] + "<br/>" : "");
    };
    info.addTo(model_map);



  //geoJSON object and coloring of county
  geoJSON= L.geoJSON(this.model_map_obj, {
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
      console.log("IN BIN FUNCTION")
      console.log(min)
      console.log(max)
      console.log(threshold)
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





// ACTUAL MAP --------------------------

actual_map(){

  console.log("IN ACTUAL MODEL MAP")
  let filtered=this.map_metadata.filter(e=> e['category']===this.covid_category)
  console.log(filtered)

  
  var attribute=this.covid_attr+this.current_date
  console.log("ATTRIBUTE")
  console.log(attribute)

  var min=0;  
  var threshold=200;

  var colorrange=colormap({
    colormap:'viridis',
    nshades:threshold,
    format: 'hex',
    alpha: 1
})


var ranges= getBin(min,Number(filtered[0].max),threshold);

L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
{
  id: "mapbox.light",
  attribution: "SOS"
  // can have min and max zoom here
}).addTo(actual_map);


// info block
info_actual = new L.Control({position: 'bottomleft'});
info_actual.onAdd = function () {
  if(map_status_actual==0){
    this._div = L.DomUtil.create("div", "info_actual");
    map_status_actual=1;
  }
  else
  {

    this._div=document.getElementsByClassName("info_actual")[0];

  }
    this.update();
    return this._div;
  };

 //info box display
 info_actual.update = function (props: any) {
    this._div.innerHTML =
    (props ? "<b>County: </b>" +props.NAME + "<br><b>Actual Cases: </b>"+props[attribute] + "<br/>" : "");
  };
  info_actual.addTo(actual_map);



//geoJSON object and coloring of county
geoJSON_actual= L.geoJSON(this.model_map_obj, {
  style: function (feature) {

    console.log("in geoJSON actual map fxn")
    console.log(attribute)
    console.log(feature.properties)
    console.log(feature.properties[attribute])

    return{
      color: 'black',
      weight: 0.5,
      //fillColor:getcolor(feature.id),
      fillColor:getcolor3(feature.properties[attribute]),
      fillOpacity:0.8,
    }
  },
  onEachFeature: (feature, layer) => this.onEachFeature_actual(feature, layer)
}).addTo(actual_map);






  // Functions for color and threshold 
  function getBin(min,max,threshold)
  {
    console.log("IN BIN FUNCTION")
    console.log(min)
    console.log(max)
    console.log(threshold)
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
highlightFeature_actual(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 2,
    color: "black",
    fillOpacity: 1.0
  });
  if (!L.Browser.ie && !L.Browser.edge) {
    //layer.bringToFront();
  }
  info_actual.update(layer.feature.properties);
}

 onEachFeature_actual(feature, layer: L.Layer) {
  layer.on({
    mouseover: this.highlightFeature_actual,
    mouseout: this.resetHighlight_actual,
    //click: (event) => this.getCountyDataClick(event),
  });
}

resetHighlight_actual(e) {
  geoJSON_actual.resetStyle(e.target);
  info_actual.update();
}

/*zoomToFeature(e) {
  risk_map.fitBounds(e.target.getBounds());
}*/

onOutlineEachFeature_actual(feature, layer: L.Layer) {
  layer.on({
  });
}







}
