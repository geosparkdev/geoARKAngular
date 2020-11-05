import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-db-design',
  templateUrl: './db-design.component.html',
  styleUrls: ['./db-design.component.css']
})
export class DbDesignComponent implements OnInit {
  public metadata_togg:boolean= true;

  constructor() { }

  ngOnInit(): void {
  }

}
