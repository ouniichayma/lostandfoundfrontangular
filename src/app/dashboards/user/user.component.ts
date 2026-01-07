import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { JustificatifService } from '../../services/justificatif.service';
import { ObjectService } from '../../services/object.service';
import { LostAndFoundObject } from '../../models/LostAndFoundObject';
import { HttpClient } from '@angular/common/http';
import { Justificatif } from '../../models/justificatif';
import { NotificationService } from '../../services/notification.service';


@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

    users: any[] = [];
  objects: any[] = [];

    
// Pour les objets
objectPage: number = 1;
objectPageSize: number = 3;
pagedObjects: any[] = [];




// Pour les user objets
userobjectPage: number = 1;
userobjectPageSize: number = 3;
pageduserObjects: any[] = [];




      plog: any = null; // Utilisateur connecté


justificatifFile: File | null = null;


  justificatifs: Justificatif[] = [];


       object: LostAndFoundObject[] = [];





 notifications: any[] = [];


  showDropdown = false;



pagedJustificatifs: any[] = [];

JustificatifcurrentPage: number = 1;
JustificatifpageSize: number = 3; // Nombre de justificatifs par page
JustificatiftotalPages: number = 0;

 constructor(public adminService: AdminService,public route:Router,private objectService: ObjectService, private router: ActivatedRoute,
    private justificatifService: JustificatifService, private http: HttpClient,public notificationService:NotificationService ) { }

  ngOnInit(): void {

     this.loadUsers();
    
    this.loadConnectedUser();
   

    this.loadObjects();



  
this.justificatifService.getJustificatifsByUser(this.plog.id).subscribe(data => {
    this.justificatifs = data;
    this.JustificatiftotalPages = Math.ceil(this.justificatifs.length / this.JustificatifpageSize);
    this.updatePagedJustificatifs();
  });







this.notificationService.getNotificationsByUser(this.plog.id).subscribe(
    data => {
      console.log('Notifications reçues:', data); // ← DOIT s’afficher
      console.log('Plog ID:', this.plog?.id);
      this.notifications = data;
    },
    error => console.error('Erreur lors de la récupération des notifications', error)
  );



this.loaduserObjects();
   
  }









 toggleDropdown() {
    this.showDropdown = !this.showDropdown;
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






  
  

  
  public logout(): void {
    // Nettoyez le localStorage et redirigez
    localStorage.removeItem('authUser');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
      localStorage.removeItem('plog');
    this.route.navigate(['/login']);
  }




  loadUsers(): void {
    this.adminService.getUsers().subscribe(
      data => this.users = data,
      error => console.error('Error loading users', error)
    );
  }





























  
loadObjects(): void {
  this.objectService.getObjects().subscribe(data => {
    this.objects = data;
    this.setPagedObjects();
  });
}

setPagedObjects(): void {
  const startIndex = (this.objectPage - 1) * this.objectPageSize;
  const endIndex = startIndex + this.objectPageSize;
  this.pagedObjects = this.objects.slice(startIndex, endIndex);
}

nextObjectPage(): void {
  if ((this.objectPage * this.objectPageSize) < this.objects.length) {
    this.objectPage++;
    this.setPagedObjects();
  }
}

prevObjectPage(): void {
  if (this.objectPage > 1) {
    this.objectPage--;
    this.setPagedObjects();
  }
}

totalObjectPages(): number {
  return Math.ceil(this.objects.length / this.objectPageSize);
}




























  
loaduserObjects(): void {
  this.objectService.getObjectsByUserId(this.plog.id).subscribe(data => {
    this.object = data;
    this.setPageduserObjects();
  });
}

setPageduserObjects(): void {
  const startIndex = (this.userobjectPage - 1) * this.userobjectPageSize;
  const endIndex = startIndex + this.userobjectPageSize;
  this.pageduserObjects = this.object.slice(startIndex, endIndex);
}

nextuserObjectPage(): void {
  if ((this.userobjectPage * this.userobjectPageSize) < this.object.length) {
    this.userobjectPage++;
    this.setPageduserObjects();
  }
}

prevuserObjectPage(): void {
  if (this.userobjectPage > 1) {
    this.userobjectPage--;
    this.setPageduserObjects();
  }
}

totaluserObjectPages(): number {
  return Math.ceil(this.object.length / this.userobjectPageSize);
}






















onJustificatifFileChange(event: any) {
  this.justificatifFile = event.target.files[0];
}

submitJustificatif(matchedObject: any) {
  if (!this.justificatifFile || !matchedObject) {
    alert("Veuillez sélectionner un fichier et vérifier l'objet correspondant.");
    return;
  }

  const formData = new FormData();
  formData.append('UserId', this.plog.id);
  formData.append('ObjectId', matchedObject.id);
  formData.append('image', this.justificatifFile);

  this.http.post('https://localhost:7243/api/justificatifs/submit', formData).subscribe({
    next: (res: any) => {
      alert("Justificatif soumis avec succès !");
    },
    error: err => {
      console.error(err);
      alert("Erreur lors de la soumission du justificatif.");
    }
  });
}






























updatePagedJustificatifs() {
  const startIndex = (this.JustificatifcurrentPage - 1) * this.JustificatifpageSize;
  const endIndex = startIndex + this.JustificatifpageSize;
  this.pagedJustificatifs = this.justificatifs.slice(startIndex, endIndex);
}

goToPage(page: number) {
  if (page >= 1 && page <= this.JustificatiftotalPages) {
    this.JustificatifcurrentPage = page;
    this.updatePagedJustificatifs();
  }
}






}
