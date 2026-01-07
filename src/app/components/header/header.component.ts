import { Component, OnInit } from '@angular/core';
import { ObjectService } from '../../services/object.service';
import { AdminService } from '../../services/admin.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent   implements OnInit {


  searchKeyword: string = '';
objects: any[] = [];







// Pour les objets
objectPage: number = 1;
objectPageSize: number = 3;
pagedObjects: any[] = [];


  constructor(private objectService: ObjectService, public adminService:AdminService,private http: HttpClient) { }











         
ngOnInit(): void {

}

searchObjects(): void {
  const params: any = {};
  if (this.searchKeyword.trim()) {
    params.name = this.searchKeyword.trim();
  }

  this.http.get<any[]>('https://localhost:7243/api/object/search', { params })
    .subscribe({
      next: (data) => {
        this.objects = data;
        this.setPagedObjects(); // Si tu utilises une pagination côté Angular
      },
      error: (err) => {
        console.error('Erreur lors de la recherche :', err);
      }
    });

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

















setPagedObjects(): void {
  const startIndex = (this.objectPage - 1) * this.objectPageSize;
  const endIndex = startIndex + this.objectPageSize;
  this.pagedObjects = this.objects.slice(startIndex, endIndex);
}
}