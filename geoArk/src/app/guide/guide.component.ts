import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.css']
})
export class GuideComponent implements OnInit {


  public categories_selected:boolean=false;
  public location_selected:boolean=false;
  public models_selected:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }



  selectButton(selected:any){

    this.categories_selected=false;
    this.location_selected=false;
    this.models_selected=false;

    if(selected=="counties"){
      this.location_selected=true;
    }
    if(selected=="categories"){
      this.categories_selected=true;
    }
    if(selected=="model"){
      this.models_selected=true;
    }
  }

}
