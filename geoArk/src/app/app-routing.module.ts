import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from '../app/categories/categories.component';
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




// export function onAuthRequired({ oktaAuth, router }) {
//   // Redirect the user to your custom login page
//   router.navigate(['/login']);
// }
// const config = {
//   issuer: 'https://vu.okta.com/oauth2/default',
//   redirectUri: 'http://geoark.missouri.edu/implicit/callback',
//   clientId: '0oaab263mIdkXfafx5d6',
//   cacheMaxAge: 1000,
//   pkce: true
// }

const routes: Routes = [
  {
    path:"",
    redirectTo: 'GeoArkHome',
    pathMatch: 'full'
  },
  // {
  //   path: 'implicit/callback',
  //   component: OktaCallbackComponent
  // },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  {
    path:"GeoArkHome",
    component: MainComponent,
    // canActivate: [ OktaAuthGuard ],
    // data: {
    //   onAuthRequired
    //}
  },
  {
    path: 'rapidHome',
    component: HomeComponent,
    // canActivate: [ OktaAuthGuard ],
    // data: {
    //   onAuthRequired
    // }
   },
  {
    path: 'categories',
    component: Categories2Component,
    // canActivate: [ OktaAuthGuard ],
    // data: {
    //   onAuthRequired
    // }
   },
   {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [ OktaAuthGuard ],
    // data: {
    //   onAuthRequired
    // }
   },
  {
    path:'geoARKData',
    component: GeoarkdataHomeComponent,
    // canActivate: [ OktaAuthGuard ],
    // data: {
    //   onAuthRequired
    // }
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
    component: ModelingComponent,
    // canActivate: [ OktaAuthGuard ],
    // data: {
    //   onAuthRequired
    // }
  },
  {
    path: 'counties',
    component: LocationsComponent,
    // canActivate: [ OktaAuthGuard ],
    // data: {
    //   onAuthRequired
    // }
  },
  {
    path: 'datasources',
    component: DatasourcesComponent,
    // canActivate: [ OktaAuthGuard ],
    // data: {
    //   onAuthRequired
    // }
    
  },
  {
    path: 'howtouse',
    component: GuideComponent,
    // canActivate: [ OktaAuthGuard ],
    // data: {
    //   onAuthRequired
    // }
  },
  
    
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // OktaAuthModule.initAuth(config)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }



