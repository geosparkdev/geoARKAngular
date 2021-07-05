import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-survey3',
  templateUrl: './survey3.component.html',
  styleUrls: ['./survey3.component.css']
})
export class Survey3Component implements OnInit {



  public survey:any;
  public userid:any;


  constructor(public http: HttpClient,public route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {


      this.getSurvey();
  
      this.route.queryParams
      .subscribe(params => {
        this.userid=params.userid;
        console.log('USERIDUSERIDUSERID!***@*#*@#')
        console.log(this.userid)
  
      });

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

    let together={
      userID:this.userid,
      survey:this.survey
    }

    console.log(together)

    const customheaders= new HttpHeaders()
    .set('Content-Type', 'application/json');

    this.http.post(environment.base_url+"/postcountiessurvey",JSON.stringify(together), {headers: customheaders}).subscribe(
    response=> {

      console.log(response)
 
    },
    error => {
      console.log(error)
    }
    )
    

   this.router.navigate(['/completed'], { queryParams: { userid: this.survey.userID}})
  }






}
