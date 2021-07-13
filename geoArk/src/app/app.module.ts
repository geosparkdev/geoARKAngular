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
import { Ng5SliderModule } from 'ng5-slider';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { TooltipModule } from 'ng2-tooltip-directive';
import { GeoarkdataHomeComponent } from './geoarkdata-home/geoarkdata-home.component';
import { DbDesignComponent } from './db-design/db-design.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PredictionsComponent } from './predictions/predictions.component';
import { LocationsComponent } from './locations/locations.component';

import { PlotlyViaWindowModule } from 'angular-plotly.js';
import { DataComponent } from './data/data.component';
import { Categories2Component } from './categories2/categories2.component';
import { ModelingComponent } from './modeling/modeling.component';
import { DatasourcesComponent } from './datasources/datasources.component';
import { GuideComponent } from './guide/guide.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SurveyStartComponent } from './survey-start/survey-start.component';
import { FirstsurveyComponent } from './firstsurvey/firstsurvey.component';
import { Survey2Component } from './survey2/survey2.component';
import { Survey3Component } from './survey3/survey3.component';
import { GeoarkComponent } from './geoark/geoark.component';
import { Survey2doneComponent } from './survey2done/survey2done.component';
import { Part1startComponent } from './part1start/part1start.component';
import { SurveyfinishedComponent } from './surveyfinished/surveyfinished.component';
import { TestComponent } from './test/test.component';

 

@NgModule({
  declarations: [
    AppComponent,
    UploaddataComponent,
    HomeComponent,
    Home2Component,
    CategoriesComponent,
    DashboardComponent,
    GeoarkdataHomeComponent,
    DbDesignComponent,
    UpcomingComponent,
    PredictionsComponent,
    LocationsComponent,
    DataComponent,
    Categories2Component,
    ModelingComponent,
    DatasourcesComponent,
    GuideComponent,
    MainComponent,
    LoginComponent,
    SurveyStartComponent,
    FirstsurveyComponent,
    Survey2Component,
    Survey3Component,
    GeoarkComponent,
    Survey2doneComponent,
    Part1startComponent,
    SurveyfinishedComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    Ng5SliderModule,
    NgxSpinnerModule,
    TooltipModule,
    PlotlyViaWindowModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
