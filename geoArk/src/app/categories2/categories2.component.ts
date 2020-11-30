import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

//Third Party Packages 
import * as L from 'leaflet';
import * as colormap from 'colormap';

//Objects
import{risk_factors} from '../models/risk_factors';



@Component({
  selector: 'app-categories2',
  templateUrl: './categories2.component.html',
  styleUrls: ['./categories2.component.css']
})
export class Categories2Component implements OnInit {


  public risk_factors:risk_factors;

  public tot_table:any;
  public bar_name:any;
  public bar_data:any;


  constructor(public http: HttpClient,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.risk_factors= new risk_factors();
    this.risk_factors['Socioeconomic']=0;
    this.risk_factors['Accessibility']=0;
    this.risk_factors['Health resources']=0;


    this.getTotals(this.risk_factors);
    

  }





  getTotals(risk_factors:any){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');
  
    this.http.post(environment.base_url+"5000/getTotals",JSON.stringify(risk_factors), {headers: customheaders}).subscribe(
      response=> {
        console.log(response)
        this.bar_name=response[0];
        this.bar_data=response[1];
        this.tot_table=response[2];



  
  
      },
      error => {
        console.log(error)
      }
    )
  
  }

}
