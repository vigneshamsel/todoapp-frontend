import { Component } from '@angular/core';
import { FormBuilder, Validators,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../auth/auth.service';
import { ErrorCodeService } from '../errorhandling/error-code.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage : String ='';
  formGroup : FormGroup;
  auth : AuthService;
  router: Router;
  errocodeService: ErrorCodeService;

  constructor( private fb: FormBuilder,  private auths : AuthService, private _router  :Router, private errorCodeService: ErrorCodeService){
    this.formGroup = this.fb.group({
       name: ['', [Validators.required,Validators.minLength(6)]],
       password: ['', [Validators.required, Validators.minLength(6)]]
    })
    this.auth=auths;
    this.router=_router;
    this.errocodeService=errorCodeService;
  }

  account_login(){
    this.errorMessage='';
     const name = this.formGroup.get('name')?.value as string;
     const password = this.formGroup.get('password')?.value as string;
     this.auth.login(new User(name,password)).subscribe({
      next: (v) =>  this.rerouteToHomePage(),
      error: (e) => this.handlerrors(e)
    });
}

  rerouteToHomePage(){
    this.router.navigate(['landingpage'])
  }


  handlerrors(error:any){
    const errorCode = error?.error?.errorCode || 'UNKNOWN_ERROR';
    this.errorMessage = this.errorCodeService.getErrorMessage(errorCode);
   }

}
