import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  motDePasse: string = '';

  role: string = '';

  id!: number;

  user: User = new User();

  roles: string = '';
  nom: string = '';

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.nom = '';

    this.role = '';
    this.motDePasse = '';


  }


  onLogin() {
    this.authService.login(this.credentials).subscribe(response => {


      if (response == null) {
        alert("Uername or password is wrong");

        this.ngOnInit();
      }
      else {
        const authUser = {
          user: response.user,
          token: response.token
        }
        localStorage.setItem("authUser", JSON.stringify(authUser));
        localStorage.setItem("email", response.user.email);
          localStorage.setItem("token", response.user.token);
         localStorage.setItem("id", response.user.id);
         localStorage.setItem("nom", response.user.nom);
        console.log('Connexion réussie');
        console.log('role',response.user.role)
        console.log('user',response)
        if (response.user.role == 'user') {
          this.router.navigate(['/user']);
        }

        if (response.user.role == 'admin') {
          this.router.navigate(['/admin']);
        }
      }


    }, error => {
      alert("Login failed ");
      console.error('Erreur de connexion', error);
    });
  }
}