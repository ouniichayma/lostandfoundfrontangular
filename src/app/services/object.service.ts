import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { LostAndFoundObject } from '../models/LostAndFoundObject';

@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  public apiUrl = 'https://localhost:7243/api/object/search';



  public baseUrl = 'https://localhost:7243/api/Object';
  constructor(private http: HttpClient) { }


  searchObjects(
    name?: string,
    category?: string,
    color?: string,
    location?: string,
    fromDate?: Date,
    toDate?: Date,
    status?: string
  ): Observable<any> {
    let params = new HttpParams();

    if (category) params = params.set('category', category);
    if (name) params = params.set('name', name);
    if (color) params = params.set('color', color);
    if (location) params = params.set('location', location);
    if (fromDate) params = params.set('fromDate', fromDate.toISOString());
    if (toDate) params = params.set('toDate', toDate.toISOString());
    if (status) params = params.set('status', status);

    return this.http.get<any>(this.apiUrl, { params });
  }












  getObjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }








  getObjectsByUserId(userId: number): Observable<LostAndFoundObject[]> {
    return this.http.get<LostAndFoundObject[]>(`${this.baseUrl}/by-user/${userId}`);
  }





}