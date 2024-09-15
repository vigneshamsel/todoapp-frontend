import { Component } from '@angular/core';
import { FormBuilder, Validators,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../auth/auth.service';
import { ErrorCodeService } from '../errorhandling/error-code.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-createaccount',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './createaccount.component.html',
  styleUrl: './createaccount.component.css'
})


export class CreateaccountComponent {


  errorMessage : String ='';
  formGroup : FormGroup;
  auth : AuthService;
  router: Router;
  errocodeService: ErrorCodeService;

  constructor( private fb: FormBuilder,  private auths : AuthService, private _router  :Router,
               private errorCodeService: ErrorCodeService){
    this.formGroup = this.fb.group({
       name: ['', []],
       password: ['', []]
    })
    this.auth=auths;
    this.router=_router;
    this.errocodeService=errorCodeService;
  }

  createaccount(){
     this.errorMessage='';
     const name = this.formGroup.get('name')?.value as string;
     const password = this.formGroup.get('password')?.value as string;
     this.auth.addUser(new User(name,password)).subscribe({
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



