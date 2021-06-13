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

  constructor(public http: HttpClient) { }

  ngOnInit(): void {



    geo_map_status=0;
    geo_map = L.map("geo_map").setView([38.573936, -92.603760], 7);

    this.getAttributes();
  }


  getAttributes(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');
  
    this.http.get(environment.base_url+"/getattributes", {headers: customheaders}).subscribe(
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







}
