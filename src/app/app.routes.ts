import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [

    { path: '', component:CreateaccountComponent },
    { path: 'signup', component:CreateaccountComponent },
    { path: 'login', component: LoginComponent },
    { path: 'landingpage', component: LandingpageComponent , canActivate:[AuthGuard]},



];

