import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

  export class AuthService {
    private isLoggedIn = false;

    public apiUrl = 'https://localhost:7243/api'; 
  
    constructor(private http: HttpClient) { }
  
  
  
  
    /*signUp(dataForm: FormData): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/auth/register`, dataForm);
    }*/
    signUp(formData: FormData): Observable<any> {
      return this.http.post('https://localhost:7243/api/auth/register', formData);
    }
  
  
  
    login(credentials: { email: string, password: string }): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
        tap(res => {
          if (res && res.token) {
            this.isLoggedIn = true;
          }
        })
      );
    }
    
  
  
  
    logout(): void {
      // Perform the logout logic, e.g. delete session cookie, etc.
      this.isLoggedIn = false;
    }
  
  
    isAuthenticated(): boolean {
      // Return the authentication status
      return this.isLoggedIn;
    }






    

  getbyid(id: number) {
    return this.http.get<User>(`${this.apiUrl}/users/`+ id);

  }
 
  }  