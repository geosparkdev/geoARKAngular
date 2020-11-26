import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { environment} from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

//Third Party Packages 
import * as L from 'leaflet';
import * as colormap from 'colormap';


@Component({
  selector: 'app-modeling',
  templateUrl: './modeling.component.html',
  styleUrls: ['./modeling.component.css']
})
export class ModelingComponent implements OnInit {

  constructor(public http: HttpClient,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

}
