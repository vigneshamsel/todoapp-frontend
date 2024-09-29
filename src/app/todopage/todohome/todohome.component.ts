import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { TaskComponent } from '../task/task.component';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-todohome',
  standalone: true,
  imports: [CategoryComponent,TaskComponent],
  templateUrl: './todohome.component.html',
  styleUrl: './todohome.component.css'
})
export class TodohomeComponent {

  private authservice: AuthService;

  constructor(authservice:AuthService){
    this.authservice=authservice;

  }

  isMenuActive = false;

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  logout(){
    this.authservice.logout();

  }

}
