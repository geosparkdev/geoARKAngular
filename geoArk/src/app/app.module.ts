import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploaddataComponent } from './uploaddata/uploaddata.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { HomeComponent } from './home/home.component';
import { Home2Component } from './home2/home2.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';






@NgModule({
  declarations: [
    AppComponent,
    UploaddataComponent,
    HomeComponent,
    Home2Component,
    CategoriesComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
