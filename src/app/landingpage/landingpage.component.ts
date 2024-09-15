import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ChangeDetectorRef } from '@angular/core'; 

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css'
})
export class LandingpageComponent {
name:string;

constructor( authservice:AuthService, private cdr: ChangeDetectorRef){
  this.name='manikanna';
  authservice.getUserName().subscribe(
    res => { 
  
      this.name = res.user;

    }
)

}


  

}
