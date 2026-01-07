import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
private apiUrl = 'https://localhost:7243/api';

private apiBase= 'https://localhost:7243';

  constructor(private http: HttpClient) { }

  // Users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // Objects
  getObjects(status?: string): Observable<any[]> {
    const url = status ? `${this.apiUrl}/object/search?status=${status}` : `${this.apiUrl}/object/search`;
    return this.http.get<any[]>(url);
  }

  // Justificatifs
  getJustificatifs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/justificatifs`);
  }

  validateJustificatif(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/justificatifs/validate/${id}`, {});
  }




  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, user);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }




  // Delete a user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }



  getbyid(id: number) {
    return this.http.get<any>(`${this.apiUrl}/users/`+ id);

  }





  getUserCount(): Observable<number> {
    return this.http.get<{ userCount: number }>('https://localhost:7243/api/users/count')
      .pipe(map(response => response.userCount));
  }


  
  getObjectCount(): Observable<number> {
    return this.http.get<{ objectCount: number }>('https://localhost:7243/api/object/count')
      .pipe(map(response => response.objectCount));
  }
 
}