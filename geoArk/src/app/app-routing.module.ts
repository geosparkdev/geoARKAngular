import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from '../app/categories/categories.component';
import {HomeComponent} from '../app/home/home.component';
import {DashboardComponent} from '../app/dashboard/dashboard.component';
import { GeoarkdataHomeComponent } from './geoarkdata-home/geoarkdata-home.component';
import { UploaddataComponent } from './uploaddata/uploaddata.component';
import { DbDesignComponent } from './db-design/db-design.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PredictionsComponent } from './predictions/predictions.component';
import { LocationsComponent } from './locations/locations.component';
import {Categories2Component} from '../app/categories2/categories2.component';
import {ModelingComponent} from '../app/modeling/modeling.component';
import { DatasourcesComponent } from '../app/datasources/datasources.component';



const routes: Routes = [
  {
    path:"",
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
   },
  {
    path: 'categories',
    component: Categories2Component,
   },
   {
    path: 'dashboard',
    component: DashboardComponent,
   },
  {
    path:'geoARKData',
    component: GeoarkdataHomeComponent,
  },
  {
    path:'uploadData',
    component:UploaddataComponent,
  },
  {
    path:'dbDesign',
    component:DbDesignComponent,

  },
  {
    path:'upcomingData',
    component: UpcomingComponent,
  },
  {
    path:'predictions',
    component: ModelingComponent
  },
  {
    path: 'counties',
    component: LocationsComponent
  },
  {
    path: 'datasources',
    component: DatasourcesComponent
  },
  
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

