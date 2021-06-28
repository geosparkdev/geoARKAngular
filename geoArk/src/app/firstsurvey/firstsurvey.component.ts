import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';

@Component({
  selector: 'app-firstsurvey',
  templateUrl: './firstsurvey.component.html',
  styleUrls: ['./firstsurvey.component.css']
})
export class FirstsurveyComponent implements OnInit {


  public survey:any;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {

    this.survey={
      userID:null,
      USQ1:null,
      USQ2:null,
      USQ3:null,
      USQ4:null,
      USQ5:null,
      USQ6:null

    }
    this.getUserID();

  }




  getUserID(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');
  
    this.http.get("http://localhost:5000/getuserID", {headers: customheaders}).subscribe(
      response=> {

        this.survey.userID=response;
        console.log('USER ID:')
        console.log(this.survey.userID)

        
 
      
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
