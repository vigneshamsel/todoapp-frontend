import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { CategoryComponent } from './todopage/category/category.component';
import { AuthGuard } from './auth/auth.guard';
import { TodohomeComponent } from './todopage/todohome/todohome.component';
import { HomemarketsiteComponent } from './homemarketsite/homemarketsite.component';

export const routes: Routes = [

    { path: '', component: HomemarketsiteComponent},
    { path: 'marketing', component: HomemarketsiteComponent},
    { path: 'signup', component:CreateaccountComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component:TodohomeComponent  , canActivate:[AuthGuard]},
    { path: 'landingpage', component: CategoryComponent , canActivate:[AuthGuard]},


];

