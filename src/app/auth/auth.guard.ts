import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root' })
export class AuthGuard implements CanActivate{

  private authService: AuthService;
  private router : Router;

  constructor(auth_service : AuthService, router: Router){
    this.authService = auth_service;
    this. router =router
  }

  canActivate() : boolean{
    if(!this.authService.isTokenExpired(this.authService.getToken())){
      return true;
    }else{
      this.router.navigate(['login'])
      return false;
    }
  }

}
