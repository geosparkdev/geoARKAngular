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

  public countiesJSON:any;
  



  

  constructor(public http: HttpClient) { }

  ngOnInit(): void {

    this.getJSON();
  

  }


  getAttributes(value:any){

    let iso_key=Number(value.target.value);
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    console.log(environment.base_url);
  
    this.http.post(environment.base_url + "/getattributes",JSON.stringify(iso_key), {headers: customheaders}).subscribe(
      response=> {
        console.log(response)
        this.attributes=response;
      
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
    this.countiesJSON=response;

    geo_map_status=0;
    geo_map = L.map("geo_map").setView([38.573936, -92.603760], 7);
  
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
      this._div = L.DomUtil.create("div", "info");
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
  geo_geoJSON= L.geoJSON(this.countiesJSON.geoJSONcounties, {
    style: function (feature) {
      return{
        color: 'black',
        weight: 1,
        //fillColor:getcolor(feature.id),
        fillColor:'#ffffff',
        fillOpacity:0.8,
      }
    },
    onEachFeature: (feature, layer) => this.onEachFeature(feature, layer)
  }).addTo(geo_map);






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
