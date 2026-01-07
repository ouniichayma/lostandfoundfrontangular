import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/user';
import { ObjectService } from '../../services/object.service';
import { JustificatifService } from '../../services/justificatif.service';
import { Justificatif } from '../../models/justificatif';
import { MatchingService } from '../../services/matching.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  users: any[] = [];


  
  objects: any[] = [];
  justificatifs: any[] = [];
  selectedStatus: string = '';
  activeTab: string = 'users';


  username : any;
  role : any;
  isAdmin : any;


  plog: any = null; // Utilisateur connecté

  isLoading: boolean = true;

  objectId!: number;
 





  searchTerm: string = '';
  results: any[] = [];

  userCount: number = 0;
  objectCount: number = 0;






  selectedJustificatifs: Justificatif[] = [];
  selectedObjectId: number | null = null;



  constructor(public adminService: AdminService,public route:Router,private objectService: ObjectService, private router: ActivatedRoute,
    private justificatifService: JustificatifService,private matchingService: MatchingService) { }

  ngOnInit(): void {
    this.loadUsers();
    
    this.loadConnectedUser();


    this.loadJustificatifs();
    
    this.loadUserCount();

      
    this.loadObjectCount();
    

     this.loadObjects()
   
  }



  getTitleText(): string {
    if (this.selectedStatus === '') {
      return 'All Objects';
    } else if (this.selectedStatus === 'Lost') {
      return 'Lost Objects';
    } else {
      return 'Found Objects';
    }
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
    this.route.navigate(['/login']);
  }




  loadUsers(): void {
    this.adminService.getUsers().subscribe(
      data => this.users = data,
      error => console.error('Error loading users', error)
    );
  }

  loadObjects(status?: string): void {
    this.adminService.getObjects(status).subscribe(
      data => {
        this.objects = data;
        console.log(this.objects); // Afficher l'objet complet pour vérifier sa structure
        if (this.objects.length > 0) {
          console.log(this.objects[0]?.ImageUrl); // Loguer ImageUrl pour le premier élément
        }
      },
      error => console.error('Error loading objects', error)
    );
  }

  loadJustificatifs(): void {
    this.adminService.getJustificatifs().subscribe(
      data => this.justificatifs = data,
      error => console.error('Error loading justificatifs', error)
    );
  }




  



  validateJustificatif(id: number): void {
    this.adminService.validateJustificatif(id).subscribe(
      () => {
        alert('Justificatif validated successfully');
  
        // ✅ Met à jour localement l'élément dans le tableau
        const just = this.justificatifs.find(j => j.id === id);
        if (just) {
          just.status = 'Approved';
        }
      },
      error => console.error('Error validating justificatif', error)
    );
  }

  changeTab(tab: string): void {
    this.activeTab = tab;
    if (tab === 'users') {
      this.loadUsers();
    } else if (tab === 'objects') {
      this.loadObjects();
    } else if (tab === 'justificatifs') { 
      this.loadJustificatifs();
    }
  }

  filterObjects(): void {
    this.loadObjects(this.selectedStatus);
  }















  
updateuser(id:number){
  this.route.navigate(['edit',id])
  
}
loding(){
  this.adminService.getUsers()
  alert('deleted')
}


removeData(id: number) {
  if (window.confirm('Are sure you want to delete this user ?')) {
  this.adminService.deleteUser(id)
    .subscribe(
      data => {
        console.log(data);
        this.loadUsers();
        
        
      },
      error => console.log(error));
}
}






















onSearch(): void {
  const term = this.searchTerm.trim();

  if (term === '') {
    this.results = []; // ou récupérer tous les objets si c'est ton intention
    return;
  }

  this.objectService.searchObjects(term).subscribe(
    (data) => {
      this.results = data;
    },
    (error) => {
      console.error('Error searching objects', error);
    }
  );
}






loadUserCount(): void {
  this.adminService.getUserCount().subscribe(
    count => this.userCount = count,
    error => console.error('Erreur lors de la récupération du nombre d\'utilisateurs', error)
  );
}




loadObjectCount(): void {
  this.adminService.getObjectCount().subscribe(
    count => this.objectCount = count,
    error => console.error('Erreur lors de la récupération du nombre d\'utilisateurs', error)
  );
}
















}