import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { HttpHeaders } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const TOKEN_NAME: string = 'jwt_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl = 'https://api.todoapp.online';
  httpclient:HttpClient



  constructor(private http: HttpClient) { 
    let urlnamea:string =window.location.hostname;
    if(urlnamea.includes('localhost')){
      this.baseUrl='http://localhost:8754'
    }
    this.httpclient=http;
  }

  getToken(): string |null {
    return localStorage.getItem(TOKEN_NAME)?.toString()||null;
  }

  setToken(token: string): void {
    console.log("New token set"+ token);
    localStorage.setItem(TOKEN_NAME, token);
  }

  getTokenExpirationDate(token: string): Date |null {
    const decoded = jwtDecode(token);
    if (decoded.exp === undefined) {
       return null;
    }
    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string|null): boolean {
    let internalToken : string|null = '';
    if(!token){
      internalToken = this.getToken();
      if(!internalToken){
        token=internalToken?.toString();
      }

    }
    if(!token) return true;
    const date = this.getTokenExpirationDate(token);
    console.log(date);
    if(date === undefined || date==null) return false;
    return !(date.valueOf() > new Date().valueOf());
  }


  addUser(user :User){
    console.log(user);
    return this.http.post<{ userName: string, token: string }>(`${this.baseUrl}/user/register`, user).pipe(
      tap((response) => {
        // Set token from response

        const token = response.token;
        console.log("New token from response"+ token);

        if (token) {
           this.setToken(token)
        }
      })

    );
  }

  getUserName(): Observable<{ user: string}> {
    return this.http.get<{ user: string}>(this.baseUrl + '/getuser/get');
  }


  login(user :User){
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    const body = new HttpParams()
      .set('name', user.name)
      .set('password', user.password);
      return this.http.post<{ userName: string, token: string }>(`${this.baseUrl}/user/login`, user).pipe(
        tap((response) => {
          const token = response.token;
          if (token) {
             this.setToken(token)
          }
        })
  
      );      
  }
}
