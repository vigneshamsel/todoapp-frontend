import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomecomponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'todoapp';
}
