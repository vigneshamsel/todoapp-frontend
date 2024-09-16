import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { CategoryComponent } from './todopage/category/category.component';
import { AuthGuard } from './auth/auth.guard';
import { TodohomeComponent } from './todopage/todohome/todohome.component';

export const routes: Routes = [

    { path: '', component:CreateaccountComponent },
    { path: 'signup', component:CreateaccountComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component:TodohomeComponent  , canActivate:[AuthGuard]},

    { path: 'landingpage', component: CategoryComponent , canActivate:[AuthGuard]},



];

