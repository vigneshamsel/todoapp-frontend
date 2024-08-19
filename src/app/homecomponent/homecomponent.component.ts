import { Component } from '@angular/core';

@Component({
  selector: 'app-homecomponent',
  standalone: true,
  imports: [],
  templateUrl: './homecomponent.component.html',
  styleUrl: './homecomponent.component.css'
})

export class HomecomponentComponent {

  handlelogin(){
     const clientId = 'YOUR_CLIENT_ID';  // Replace with your Google Client ID
     const redirectUri = 'http://localhost:4200/callback';  // Replace with your redirect URI
     const scopes = 'profile email';  // Requested scopes (optional)
     const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code`;
     window.location.href = url;
    alert("clicked")
  }

}
