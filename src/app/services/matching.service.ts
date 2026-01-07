import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchingService {

  private apiUrl = 'https://localhost:7243/api/matching/match-all'; 
   constructor(private http: HttpClient) {
    this.startAutoMatch(); // Lancer le timer dès l'initialisation
  }

// Fonction qui appelle l'API match-all
  matchAllObjects() {
    return this.http.post(this.apiUrl, {});
  }

  // Lancer un appel toutes les 5 minutes (300000 ms)
  startAutoMatch() {
    setInterval(() => {
      this.matchAllObjects().subscribe({
        next: (res) => console.log('Match success:', res),
        error: (err) => console.error('Match error:', err)
      });
    }, 1000); // 5 minutes
  }
}