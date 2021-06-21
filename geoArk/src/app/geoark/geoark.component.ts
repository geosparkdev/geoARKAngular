import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';
import * as L from 'leaflet';





var geo_map:any;
var geo_info:any;
var geo_map_status:any;
var geo_geoJSON:any;



@Component({
  selector: 'app-geoark',
  templateUrl: './geoark.component.html',
  styleUrls: ['./geoark.component.css']
})
export class GeoarkComponent implements OnInit {


  public attributes:any;
  public data:any;
  public attributes_display:any;

  public countiesJSON:any;
  public first_data:boolean=true;

  public data_title:any;
  
  public p: number = 1;


  

  constructor(public http: HttpClient) { }

  ngOnInit(): void {

    
    this.getJSON();
    

  }


  getAttributes(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    console.log(environment.base_url);
  
    this.http.post(environment.base_url + "/getattributes", {headers: customheaders}).subscribe(
      response=> {
        console.log(response)
        this.attributes=response;
        this.attributes_display=response;
      
      },
      error => {
        console.log("inside error")
        console.log(error)
      }
    )
  
  }



  getData(index:any){

  let request=[this.attributes[index].dataset_id, this.attributes[index].attr_label]


  const customheaders= new HttpHeaders()
  .set('Content-Type', 'application/json');

  this.http.post(environment.base_url + "/getgeoarkdata",JSON.stringify(request), {headers: customheaders}).subscribe(
  response=> {
  console.log(response)
  this.data=response;


  if(this.first_data==false){
    geo_geoJSON.clearLayers();
  }
  this.first_data=false;
  this.map()

  },
  error => {
    console.log("inside error=--GetData fxn")
    console.log(error)
  }
)

  }


  getJSON(){

  
    const customheaders= new HttpHeaders()
    .set('Content-Type', 'application/json');
  
    this.http.get(environment.base_url + "/getuscountiesjson", {headers: customheaders}).subscribe(
    response=> {
    console.log(response)
    this.countiesJSON=[response];

    geo_map_status=0;
    geo_map = L.map("geo_map").setView([37.8, -96], 4);
   // this.map()

   this.getAttributes()
  
    },
    error => {
      console.log("inside error=--getJSON fxn")
      console.log(error)
    }
  )
  
    }
  

  





 
  map(){

    var data=this.data;

  


  L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", 
  {
    id: "mapbox.light",
    attribution: "SOS"
    // can have min and max zoom here
  }).addTo(geo_map);


  // info block
  geo_info = new L.Control({position: 'bottomleft'});
  geo_info.onAdd = function () {
    if(geo_map_status==0){
      this._div = L.DomUtil.create("div", "geo_info");
      geo_map_status=1;
    }
    else
    {

      this._div=document.getElementsByClassName("geo_info")[0];

    }
      this.update();
      return this._div;
    };

   //info box display
    geo_info.update = function (props: any) {
      this._div.innerHTML =
        (props ? "<b>County: </b>" : "<h4>Click to see details of another county.</h4>");
    };
    geo_info.addTo(geo_map);



  //geoJSON object and coloring of county
  geo_geoJSON= L.geoJSON(this.countiesJSON, {
    style: function (feature) {
      return{
        color: 'black',
        weight: 0,
        fillColor:getcolor(feature.properties['STATE'],feature.properties['COUNTY']),
       // fillColor:'#ffffff',
        fillOpacity:0.8,
      }
    },
    onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
  }).addTo(geo_map);


  function getcolor(state, county){

    let value= state+county
    console.log('in getcolor fxn within map fxn')
    console.log(value)
    let temp=data.find(e=> e['fips']===value)

    //console.log(temp)
    //console.log(temp.color)

    
    if (temp==null) {
      // the variable is defined
      return '#000000'
  }
   else{
    
    return temp.color
   } 
  }







}




// map functions 
highlightFeature(e) {
  const layer = e.target;
  layer.setStyle({
    weight: 2,
    color: "black",
    fillOpacity: 0.8
  });
  if (!L.Browser.ie && !L.Browser.edge) {
    //layer.bringToFront();
  }
  geo_info.update(layer.feature.properties);
}

 onEachFeature(feature, layer: L.Layer) {
  layer.on({
    mouseover: this.highlightFeature,
    mouseout: this.resetHighlight,
  });
}

resetHighlight(e) {
  geo_geoJSON.resetStyle(e.target);
  geo_info.update();
}

/*zoomToFeature(e) {
  risk_map.fitBounds(e.target.getBounds());
}*/

onOutlineEachFeature(feature, layer: L.Layer) {
  layer.on({
  });
} 




}
