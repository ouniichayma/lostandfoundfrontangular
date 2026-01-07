import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Justificatif } from '../models/justificatif';

@Injectable({
  providedIn: 'root'
})
export class JustificatifService {

  private apiUrl = 'https://localhost:7243/api/justificatifs';

  constructor(private http: HttpClient) { }



  getJustificatifsByObjectId(objectId: number): Observable<Justificatif[]> {
    return this.http.get<Justificatif[]>(`https://localhost:7243/api/justificatifs/by-object/${objectId}`);
  }





   getJustificatifsByUser(userId: number): Observable<Justificatif[]> {
    return this.http.get<Justificatif[]>(`${this.apiUrl}/by-user/${userId}`);
  }

}
