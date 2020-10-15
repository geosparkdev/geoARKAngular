import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public map:any;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
    this.getMap()
  }

  getMap(){
    const customheaders= new HttpHeaders()
          .set('Content-Type', 'application/json');

    this.http.get("http://localhost:5000/dbMap", {headers: customheaders}).subscribe(
      response=> {
        console.log(response)
        this.map=response;
      },
      error => {
        console.log(error)
      }
    )
  }
  
}

