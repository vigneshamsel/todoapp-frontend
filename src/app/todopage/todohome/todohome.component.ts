import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';
import { TaskComponent } from '../task/task.component';
@Component({
  selector: 'app-todohome',
  standalone: true,
  imports: [CategoryComponent,TaskComponent],
  templateUrl: './todohome.component.html',
  styleUrl: './todohome.component.css'
})
export class TodohomeComponent {

  isMenuActive = false;

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

}
