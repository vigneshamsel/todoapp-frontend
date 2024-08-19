import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'landingpage', component: LandingpageComponent },
    { path: '', component:CreateaccountComponent },

    { path: 'signup', component:CreateaccountComponent },


];

