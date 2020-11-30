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
  public tot_bar:any;


  constructor(public http: HttpClient,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {

    this.risk_factors= new risk_factors();
    this.risk_factors.Socioeconomic=0;
    this.risk_factors.Accessibility=0;
    this.risk_factors.Health_resources=0;

    let factors_list=[this.risk_factors.Accessibility,this.risk_factors.Exposure,this.risk_factors.Health_resources,this.risk_factors.Socioeconomic,this.risk_factors.Susceptibility,this.risk_factors.Transmission]
    console.log(factors_list)

    this.getTotals(factors_list);
    

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

        this.getTotalsGraph();



  
  
      },
      error => {
        console.log(error)
      }
    )
  
  }


  getTotalsGraph(){

    let colors = colormap({
      colormap:'portland',
      nshades: this.bar_data.length,
      format: 'oxygen',
      alpha: 1
  })


    this.tot_bar = {
      data: [
          { x: this.bar_data, 
            y: this.bar_name, 
            type: 'bar', 
            orientation:'h',
            //mode: 'lines', 
            name:'tot cases',
            marker: {color: 'red'} 
          },
      ],
      layout: {
              width: 400, 
              height: 800, 

              title: {
                text: 'title',
                font: {
                  size: 12
                },
                standoff: -5
              },
  
              margin:{
                l:50, 
                r:20, 
                t:20, 
                b:30, 
                pad:0
              },

              size: 6,
         }
     };
  }

}
