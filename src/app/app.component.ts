import { Component } from '@angular/core';
import { MatchingService } from './services/matching.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LostAndFoundFront';
   constructor(private matchingService: MatchingService) {
    // rien à faire ici, juste l'injection suffit à démarrer autoMatch
  }
}