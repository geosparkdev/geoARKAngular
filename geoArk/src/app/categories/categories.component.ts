//Core Packages
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//Models
import { categories} from '../models/categories';
import { subcategories} from '../models/subcategories';

//Third Party Packages 
import * as L from 'leaflet';
import { Options,ChangeContext } from 'ng5-slider';
import { NgxSpinnerService } from "ngx-spinner";



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {



// category and subcategory variables
  public categories:categories; 
	public subcategories:subcategories;
	

	public current_categories: any;
	public current_subcat:any;


  public subcategories_togg: boolean=false;

  public susceptiblity_togg: boolean=false;
  public transmission_togg: boolean=false;
  public exposure_togg: boolean=false;
  public health_togg: boolean=false;
  public accessibility_togg: boolean=false;
  public socioeconomic_togg: boolean=false;

  constructor(public http: HttpClient,private spinner: NgxSpinnerService,private route:Router) { }

  ngOnInit(): void {

		//initialize categories and subcategories (buttons)
    this.subcategories=new subcategories();
		this.categories=new categories();
		
	
  }



//Create Category Buttons and set current_category
  setCategory(index:number){
    this.categories=new categories();
    this.current_categories=this.categories.categories[index].name
    this.categories.categories[index].selected=true;
    this.getSubcat(this.categories.categories[index].toggle);
    console.log(this.categories.categories[index].toggle)

  }

//Toggle category specific sub-categories group
  getSubcat( category: string){
    this.subcategories_togg=true;

    this.susceptiblity_togg=false;
    this.transmission_togg=false;
    this.exposure_togg=false;
		this.health_togg=false;
		this.accessibility_togg=false;
		this.socioeconomic_togg=false;

			if (category=='susceptiblity')
			{
				this.susceptiblity_togg=true;
			}
			else if (category=='transmission')
			{
				this.transmission_togg=true;
			}
			else if (category=='exposure')
			{
				this.exposure_togg=true;
			}
			else if (category=='health')
			{
				this.health_togg=true;
		}
		else if (category=='accessibility')
			{
				this.accessibility_togg=true;
		}
		
		else if (category=='socioeconomic')
			{
				this.socioeconomic_togg=true;
			}
  }

//Create sub-category buttons
  setSubCat(index:number){
 
    this.subcategories=new subcategories();
    if (this.current_categories=='Susceptibility')
    {
			this.subcategories.susceptiblity_sub[index].selected=true;
			this.current_subcat=this.subcategories.susceptiblity_sub[index].name;
    }
    else if (this.current_categories=='Transmission')
    {
			this.subcategories.transmission_sub[index].selected=true;
			this.current_subcat=this.subcategories.transmission_sub[index].name;
    }
    else if (this.current_categories=='Exposure')
    {
			this.subcategories.exposure_sub[index].selected=true;
			this.current_subcat=this.subcategories.exposure_sub[index].name;
    }
    else if (this.current_categories=='Health resources')
    {
			this.subcategories.health_sub[index].selected=true;
			this.current_subcat=this.subcategories.health_sub[index].name;
		}
		
		console.log(this.current_subcat);




		this.route.navigate(['/', 'dashboard'],{ queryParams: { tags:[ this.current_categories, this.current_subcat ] }});

    //setTimeout(() => {
      //console.log("Ticking")
      //this.getMap();
   // }, 200)
  }

  


}
