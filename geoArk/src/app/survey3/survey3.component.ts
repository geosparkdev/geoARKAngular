import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';

@Component({
  selector: 'app-survey3',
  templateUrl: './survey3.component.html',
  styleUrls: ['./survey3.component.css']
})
export class Survey3Component implements OnInit {



  public survey:any;


  constructor(public http: HttpClient) { }

  ngOnInit(): void {

    this.getSurvey();


  }


  getSurvey(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');
  
    //this.http.get(environment.base_url+"/getsurvey2", {headers: customheaders}).subscribe(
    this.http.get(environment.base_url+"/getsurvey3", {headers: customheaders}).subscribe(
      response=> {

        this.survey=response;

        
 
      
      },
      error => {
        console.log("inside error")
        console.log(error)
      }
    )
  
  }

  sendForm(){


    console.log(this.survey)
  }





}
