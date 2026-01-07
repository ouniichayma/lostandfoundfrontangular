import { Component, OnInit } from '@angular/core';
import { LostAndFoundObject } from '../../models/LostAndFoundObject';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-found-object',
  standalone: false,
  templateUrl: './add-found-object.component.html',
  styleUrl: './add-found-object.component.css'
})
export class AddFoundObjectComponent implements OnInit {

  lostObject: LostAndFoundObject = {
    name: '',
    category: '',
    color: '',
    brand: '',
    location: '',
    date: '',
    userId: 0,
    id: 0,
    isClaimed: false,
    status: 'Found', // Définir directement ici
    matchedObjectId: 0, // Facultatif
    imageUrl:''
  };

  selectedFile: File | null = null;

  
      plog: any = null; // Utilisateur connecté

  constructor(private http: HttpClient) {}




 ngOnInit(): void {

  
    
    this.loadConnectedUser();
   

   
  }




    loadConnectedUser(): void {
    // Récupération directe depuis localStorage
    const authUser = localStorage.getItem('authUser');
    
    if (authUser) {
      this.plog = JSON.parse(authUser).user;
      console.log('Utilisateur connecté:', this.plog);
      // Récupération de l'URL de l'image depuis localStorage
    this.plog.imageUrl = localStorage.getItem('image');
    console.log('Image URL:', this.plog?.imageUrl);  // Vérifie ici si imageUrl est bien présent
    } else {
      console.warn('Aucun utilisateur connecté trouvé dans localStorage');
    }
  }



  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();

    // Champs requis (à envoyer obligatoirement)
    formData.append('name', this.lostObject.name);
    formData.append('location', this.lostObject.location);
    formData.append('userId', this.plog.id);
    formData.append('status', this.lostObject.status);

    // Formatage correct de la date
    if (this.lostObject.date) {
      const date = new Date(this.lostObject.date).toISOString();
      formData.append('date', date);
    }

    // Champs facultatifs (ajoutés s'ils existent)
    if (this.lostObject.category) formData.append('category', this.lostObject.category);
    if (this.lostObject.color) formData.append('color', this.lostObject.color);
    if (this.lostObject.brand) formData.append('brand', this.lostObject.brand);
    if (this.lostObject.matchedObjectId)
      formData.append('matchedObjectId', this.lostObject.matchedObjectId.toString());

    // Image
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Requête POST vers l’API
    this.http.post('https://localhost:7243/api/object/declare/found', formData)
      .subscribe({
        next: res => alert("Objet perdu déclaré avec succès"),
        error: err => {
          console.error(err);
          alert("Erreur lors de la déclaration : " + (err.error || err.message));
        }
      });
  }
}