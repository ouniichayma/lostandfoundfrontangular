import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { JustificatifService } from '../../services/justificatif.service';
import { ObjectService } from '../../services/object.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit {

 objectId!: number;
   objects: any[] = [];




    users: any[] = [];
  









// Pour les objets
objectPage: number = 1;
objectPageSize: number = 3;
pagedObjects: any[] = [];

// Pour les utilisateurs
userPage: number = 1;
userPageSize: number = 3;
pagedUsers: any[] = [];



     constructor(private objectService: ObjectService, public adminService:AdminService) { }



       
ngOnInit(): void {
  this.loadObjects();

   this.loadUsers();
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











loadUsers(): void {
  this.adminService.getUsers().subscribe(data => {
    this.users = data;
    this.setPagedUsers();
  });
}

setPagedUsers(): void {
  const startIndex = (this.userPage - 1) * this.userPageSize;
  const endIndex = startIndex + this.userPageSize;
  this.pagedUsers = this.users.slice(startIndex, endIndex);
}

nextUserPage(): void {
  if ((this.userPage * this.userPageSize) < this.users.length) {
    this.userPage++;
    this.setPagedUsers();
  }
}

prevUserPage(): void {
  if (this.userPage > 1) {
    this.userPage--;
    this.setPagedUsers();
  }
}

totalUserPages(): number {
  return Math.ceil(this.users.length / this.userPageSize);
}


}