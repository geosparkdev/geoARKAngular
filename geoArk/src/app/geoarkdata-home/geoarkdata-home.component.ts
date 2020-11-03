import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-geoarkdata-home',
  templateUrl: './geoarkdata-home.component.html',
  styleUrls: ['./geoarkdata-home.component.css']
})
export class GeoarkdataHomeComponent implements OnInit {

  public sources_obj:any;
  public sources_num:any;

  public datasets_obj:any;
  public datasets_num:any;

  public total_attributes:any;


  constructor(public http: HttpClient,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.geoarkdatahome();
  }


  geoarkdatahome(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.get("http://localhost:5000/geoarkdatahome", {headers: customheaders}).subscribe(
      response=> {
        console.log(response)

        this.sources_obj=response[0];
        this.sources_num=response[1];
        this.datasets_obj=response[2];
        this.datasets_num=response[3];
        this.total_attributes=response[4];

    
      },
      error => {
        console.log(error)
      }
    )
  }

}
