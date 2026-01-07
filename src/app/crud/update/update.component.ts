import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent  implements OnInit {
  userId!: number;
  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    passwordHash :'',
    password:''
  };

  constructor(
    private route: ActivatedRoute,
    private userService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.userService.getUser(this.userId).subscribe(data => {
      this.user = data;
    });
  }

  onSubmit(): void {
    this.userService.updateUser(this.userId, this.user).subscribe(() => {
      alert('Utilisateur mis à jour avec succès !');
      this.router.navigate(['/users']); // redirection
    });
  }
}