import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JustificatifService } from '../../services/justificatif.service';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-justificatifobj',
  standalone: false,
  templateUrl: './justificatifobj.component.html',
  styleUrl: './justificatifobj.component.css'
})
export class JustificatifobjComponent implements OnInit {
  objectId!: number;
  justificatifs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private justificatifService: JustificatifService,
    public adminService:AdminService
  ) {}

  ngOnInit(): void {
    this.objectId = +this.route.snapshot.paramMap.get('id')!;
    this.loadJustificatifs();
  }

  loadJustificatifs(): void {
    this.justificatifService.getJustificatifsByObjectId(this.objectId)
      .subscribe({
        next: data => {
          this.justificatifs = data;
          console.log('Justificatifs:', this.justificatifs);
        },
        error: err => {
          console.error('Erreur de récupération des justificatifs', err);
        }
      });
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


  


}