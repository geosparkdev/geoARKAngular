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
  public risk_factors:risk_factors;

  constructor(public http: HttpClient,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getDataSources('exposure');
  }


  getDataSources(risk_factor:any){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');
  
    this.http.post(environment.base_url+"5000/getdatasources",JSON.stringify(risk_factor), {headers: customheaders}).subscribe(
      response=> {
        this.risk_factors= new risk_factors()
        
        if(risk_factor=='accessibility'){
          this.risk_factors.Accessibility=1;
        }
        else if (risk_factor=='exposure'){
          this.risk_factors.Exposure=1
        }
        else if (risk_factor=='health resources'){
          this.risk_factors.Health_resources=1
        }
        else if(risk_factor=='socioeconomic'){
          this.risk_factors.Socioeconomic=1
        }
        else if(risk_factor=='susceptibility'){
          this.risk_factors.Susceptibility=1
        }
        else{
          this.risk_factors.Transmission=1
        }
        

        this.data_sources=response;
 
      
      },
      error => {
        console.log("inside error")
        console.log(error)
      }
    )
  
  }

}
