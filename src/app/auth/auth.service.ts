import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8091';

  httpclient:HttpClient

  constructor(private http: HttpClient) { 
    this.httpclient=http;
  }

  addUser(user :User){
    console.log(user);
    return this.http.post(`${this.baseUrl}/user/add`, user);
  }

  login(user :User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    const body = new HttpParams()
      .set('name', user.name)
      .set('password', user.password);
  
    return this.http.post(`${this.baseUrl}/user/newlogin`, body.toString(), { headers, withCredentials: true });
      
  }
}
