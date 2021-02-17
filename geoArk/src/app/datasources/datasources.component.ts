import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { Options,ChangeContext } from 'ng5-slider';

//Third Party Packages 
import * as L from 'leaflet';
import * as colormap from 'colormap';

//Objects
import{risk_factors} from '../models/risk_factors';
import {filter } from '../models/filterBase';


@Component({
  selector: 'app-datasources',
  templateUrl: './datasources.component.html',
  styleUrls: ['./datasources.component.css']
})
export class DatasourcesComponent implements OnInit {


  public data_sources:any;

  constructor(public http: HttpClient,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getDataSources('accessibility');
  }


  getDataSources(risk_factors:any){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');
  
    this.http.post(environment.base_url+"5000/getdatasources",JSON.stringify(risk_factors), {headers: customheaders}).subscribe(
      response=> {

        this.data_sources=response;
        console.log(this.data_sources)
      
      },
      error => {
        console.log(error)
      }
    )
  
  }

}
