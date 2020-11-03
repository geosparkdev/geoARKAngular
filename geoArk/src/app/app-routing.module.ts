import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from '../app/categories/categories.component';
import {HomeComponent} from '../app/home/home.component';
import {DashboardComponent} from '../app/dashboard/dashboard.component';
import { GeoarkdataHomeComponent } from './geoarkdata-home/geoarkdata-home.component';
import { UploaddataComponent } from './uploaddata/uploaddata.component';
import { DbDesignComponent } from './db-design/db-design.component';



const routes: Routes = [
  {
    path:"",
    redirectTo: 'geoARKData',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
   },
  {
    path: 'categories',
    component: CategoriesComponent,
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

  }
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

