import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from '../app/categories/categories.component';
import {HomeComponent} from '../app/home/home.component';
import {DashboardComponent} from '../app/dashboard/dashboard.component';



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
    component: CategoriesComponent,
   },
   {
    path: 'dashboard',
    component: DashboardComponent,
   },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

