import { Component } from '@angular/core';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-todohome',
  standalone: true,
  imports: [CategoryComponent],
  templateUrl: './todohome.component.html',
  styleUrl: './todohome.component.css'
})
export class TodohomeComponent {

}
