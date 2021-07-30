import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { CategoriesComponent } from '../app/categories/categories.component';
import {HomeComponent} from '../app/home/home.component';
import {DashboardComponent } from '../app/dashboard/dashboard.component';
import { GeoarkdataHomeComponent } from './geoarkdata-home/geoarkdata-home.component';
import { UploaddataComponent } from './uploaddata/uploaddata.component';
import { DbDesignComponent } from './db-design/db-design.component';
import { UpcomingComponent } from './upcoming/upcoming.component';
import { PredictionsComponent } from './predictions/predictions.component';
import { LocationsComponent } from './locations/locations.component';
import { Categories2Component} from '../app/categories2/categories2.component';
import { ModelingComponent} from '../app/modeling/modeling.component';
import { DatasourcesComponent } from '../app/datasources/datasources.component';
import { GuideComponent } from '../app/guide/guide.component';
import { MainComponent } from './main/main.component';
import { OktaCallbackComponent, OktaAuthGuard, OktaAuthModule } from '@okta/okta-angular';
import { LoginComponent} from '../app/login/login.component';
import { SurveyStartComponent } from '../app/survey-start/survey-start.component';
import { FirstsurveyComponent } from '../app/firstsurvey/firstsurvey.component';
import {Survey2Component} from '../app/survey2/survey2.component';
import {Survey3Component} from '../app/survey3/survey3.component';
import { GeoarkComponent } from './geoark/geoark.component';
import { Survey2doneComponent } from './survey2done/survey2done.component';
import { Part1startComponent } from './part1start/part1start.component';
import { SurveyfinishedComponent } from './surveyfinished/surveyfinished.component';
import { TestComponent } from './test/test.component';




// const routes: Routes = [
//   {
//     path:"",
//     redirectTo: 'GeoArkHome',
//     pathMatch: 'full'
//   },
//   {
//     path:"GeoArkHome",
//     component: MainComponent,
//   },


//   Covid Dashboard Routes
//   {
//     path: 'rapidHome',
//     component: HomeComponent,
//    },
//   {
//     path: 'categories',
//     component: Categories2Component,
//    },
//    {
//     path: 'counties',
//     component: LocationsComponent,
//   },
//   {
//     path: 'datasources',
//     component: DatasourcesComponent,
    
//   },
//   {
//     path: 'howtouse',
//     component: GuideComponent,

//   },


//   geoARKData
//   {
//     path:'geoARKData',
//     component: GeoarkdataHomeComponent,
//   },
//   {
//     path:'uploadData',
//     component:UploaddataComponent,
    
//   },
//   {
//     path:'dbDesign',
//     component:DbDesignComponent,

//   },
//   {
//     path:'upcomingData',
//     component: UpcomingComponent,
//   },
//   /*{
//     path:'predictions',
//     component: ModelingComponent,
//   },*/

//   {
//     path:'geoark',
//     component: GeoarkComponent,
//   },




//   /*evaluation*/
//   {
//   path: 'surveystart',
//   component: SurveyStartComponent,
//   },
//   {
//     path: 'survey1',
//     component: FirstsurveyComponent,
//   },
//   {
//     path:'survey2',
//     component: Survey2Component,
//   },
//   {
//     path:'survey3',
//     component: Survey3Component,
//   },
//   {
//     path:'part2start',
//     component: Survey2doneComponent,
//   },
//   {
//     path:'part1start',
//     component: Part1startComponent,
//   },
//   {
//     path:'completed',
//     component: SurveyfinishedComponent
//   },
//   {
//     path:'test',
//     component: TestComponent
//   }

// ];

// @NgModule({
//   imports: [
//     RouterModule.forRoot(routes),
//   ],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }









export function onAuthRequired({ oktaAuth, router }) {
  // Redirect the user to your custom login page
  router.navigate(['/login']);
}
const config = {
  issuer: 'https://dev-26889104.okta.com/oauth2/default',
  redirectUri: 'https://geoark.missouri.edu/implicit/callback',
  clientId: '0oaab263mIdkXfafx5d6',
  cacheMaxAge: 1000,
  pkce: true
}

const routes: Routes = [
  {
    path:"",
    redirectTo: 'GeoArkHome',
    pathMatch: 'full'
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:"GeoArkHome",
    component: MainComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
  },
  {
    path: 'rapidHome',
    component: HomeComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
   },
  {
    path: 'categories',
    component: Categories2Component,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
   },
  //  {
  //   path: 'dashboard',
  //   component: DashboardComponent,
  //   canActivate: [ OktaAuthGuard ],
  //   data: {
  //     onAuthRequired
  //   }
  // },
  // {
  //   path:'geoARKData',
  //   component: GeoarkdataHomeComponent,
  //   canActivate: [ OktaAuthGuard ],
  //   data: {
  //     onAuthRequired
  //   }
  // },
  {
    path: 'counties',
    component: LocationsComponent,
    canActivate: [ OktaAuthGuard ],
   data: {
     onAuthRequired
}
  },
  {
    path: 'datasources',
    component: DatasourcesComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
    
  },
  {
    path: 'howtouse',
    component: GuideComponent,
    canActivate: [ OktaAuthGuard ],
    data: {
      onAuthRequired
    }
  },

    
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    OktaAuthModule.initAuth(config)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }




