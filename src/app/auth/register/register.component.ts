import { Component } from '@angular/core';
import { User } from '../../models/user';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {


  
  id:number=0;
  firstName: string = '';
  lastName: string = '';
  role:string = '';
  passwordHash:string = '';
  email: string = '';
  password:string='';




user : User = new User();

signupForm!: FormGroup;


userFile:any; ;
public imagePath: any;
imgURL: any;
public message!: string;
file!: File;



current_fs!: HTMLElement;
next_fs!: HTMLElement;
previous_fs!: HTMLElement;
animating = false;



constructor(private authService : AuthService, private route : Router,private formBuilder: FormBuilder) { }



ngOnInit(): void {

    

    
  this.id;
  this.firstName = '';
  this.lastName= '';
  this.role = '';
  this.passwordHash= '';
  this.email = '';
  this.password=';'


  function passwordMatchValidator(control: AbstractControl) {
    const motDePasse = control.get('passwordHash')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    if (motDePasse !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }


  this.signupForm = this.formBuilder.group({
    id: [0, [Validators.required,]],
  
  
    firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
    role: ['user', [Validators.required]],
    passwordHash: ['', [Validators.required,Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')]],
    confirmPassword: ['', Validators.required],
    email: ['', [Validators.required,Validators.email]],
  
   
  }, {
    validator: passwordMatchValidator
  });
 

}

    /*signup() {
      this.user = this.signupForm.value;
      this.user.role = 'user';
      this.authService.signUp(this.user).subscribe(res => {
        if (res.username == '' || res.localisation == ''  || res.email == '' || res.password == ''||res.num_tel==0) {
          alert('Registration failed');
          this.signupForm.reset();
        } else {
          console.log('Registration successful');
          alert('Registration successful');
          this.route.navigate(['/login']);
        }
      }, err => {
        alert('Registration failed.');
        this.signupForm.reset();
      });
    }*/
  


    signup() {



      
      this.user = this.signupForm.value;
      this.user.role = 'user';
      
      const formData = new FormData();




      formData.append('FirstName', this.signupForm.value.firstName);
formData.append('LastName', this.signupForm.value.lastName);
formData.append('Role', this.signupForm.value.role);
formData.append('Email', this.signupForm.value.email);
formData.append('PasswordHash', this.signupForm.value.passwordHash);
formData.append('Password', this.signupForm.value.passwordHash);
     
      formData.append('profileImage', this.userFile);



   
      
      this.authService.signUp(formData).subscribe(res => {
        if (res.firstName == ''  ||res.lastName=='' || res.email == '' || res.passwordHash == '' ) {
          alert('Registration failed');
          this.signupForm.reset();
        } else {
          console.log('Registration successful');
          alert('Registration successful');
          this.route.navigate(['/login']);
        }
      }, err => {
        alert('Registration failed.');

       
        
        this.signupForm.reset();
      });
    }









    
      /*signup() {
        const formData = new FormData();
      
        formData.append('Id', this.signupForm.value.id.toString());  // même si c’est 0
        formData.append('FirstName', this.signupForm.value.firstName);
        formData.append('LastName', this.signupForm.value.lastName);
        formData.append('Email', this.signupForm.value.email);
        formData.append('PasswordHash', this.signupForm.value.passwordHash);  // temporaire pour hash
        formData.append('Role', 'User');
        formData.append('ImageUrl', '');  // facultatif, selon si tu veux gérer ça après
        formData.append('file', this.userFile);  // pour IFormFile file
      
        this.authService.signUp(formData).subscribe(
          res => {
            alert('Registration successful');
            this.route.navigate(['/login']);
          },
          err => {
            console.error(err);
            alert('Registration failed');
          }
        );
      }*/


    onSelectFile(event: Event) {
      const input = event.target as HTMLInputElement;
      if (input?.files && input.files.length > 0) {
        const file = input.files[0];
        this.userFile = file;
        const mimeType = file.type;
        if (!mimeType.match(/image\/*/)) {
          this.message = "Only images are supported.";
          return;
        }
    
        const reader = new FileReader();
        this.imagePath = file;
        reader.readAsDataURL(file);
        reader.onload = (_event) => {
          this.imgURL = reader.result;
        };
      }
    }

    

    




    next() {
      if (this.animating) return;
      this.animating = true;
      this.current_fs = document.getElementById("fieldset1")!;
      this.next_fs = document.getElementById("fieldset2")!;
      this.next_fs.style.display = "block";
      this.current_fs.style.opacity = "0";
      let scale = 1 - (1 - parseFloat(this.current_fs.style.opacity)) * 0.2;
      let left = (parseFloat(this.current_fs.style.opacity) * 50) + "%";
      let opacity = 1 - parseFloat(this.current_fs.style.opacity);
      this.current_fs.style.transform = "scale(" + scale + ")";
      this.current_fs.style.position = "absolute";
      this.next_fs.style.left = left;
      this.next_fs.style.opacity = opacity.toString();
      setTimeout(() => {
        this.current_fs.style.display = "none";
        this.animating = false;
      }, 800);
    }
    next2() {
      if (this.animating) return;
      this.animating = true;
      this.current_fs = document.getElementById("fieldset2")!;
      this.next_fs = document.getElementById("fieldset3")!;
      this.next_fs.style.display = "block";
      this.current_fs.style.opacity = "0";
      let scale = 1 - (1 - parseFloat(this.current_fs.style.opacity)) * 0.2;
      let left = (parseFloat(this.current_fs.style.opacity) * 50) + "%";
      let opacity = 1 - parseFloat(this.current_fs.style.opacity);
      this.current_fs.style.transform = "scale(" + scale + ")";
      this.current_fs.style.position = "absolute";
      this.next_fs.style.left = left;
      this.next_fs.style.opacity = opacity.toString();
      setTimeout(() => {
        this.current_fs.style.display = "none";
        this.animating = false;
      }, 800);
    }
  
    previous(){
      if (this.animating) return;
      this.animating = true;
      this.current_fs = document.getElementById("fieldset2")!;
      this.previous_fs = document.getElementById("fieldset1")!;
      this.previous_fs.style.display = "block";
      this.current_fs.style.opacity = "0";
      let scale = 0.8 + (1 - parseFloat(this.current_fs.style.opacity)) * 0.2;
      let left = ((1 - parseFloat(this.current_fs.style.opacity)) * 50) + "%";
      let opacity = 1 - parseFloat(this.current_fs.style.opacity);
      this.current_fs.style.left = left;
      this.previous_fs.style.transform = "scale(" + scale + ")";
      this.previous_fs.style.opacity = opacity.toString();
      setTimeout(() => {
       
        this.animating = false;
      }, 800);
    }

    previous2(){
      if (this.animating) return;
      this.animating = true;
      this.current_fs = document.getElementById("fieldset3")!;
      this.previous_fs = document.getElementById("fieldset2")!;
      this.previous_fs.style.display = "block";
      this.current_fs.style.opacity = "0";
      let scale = 0.8 + (1 - parseFloat(this.current_fs.style.opacity)) * 0.2;
      let left = ((1 - parseFloat(this.current_fs.style.opacity)) * 50) + "%";
      let opacity = 1 - parseFloat(this.current_fs.style.opacity);
      this.current_fs.style.left = left;
      this.previous_fs.style.transform = "scale(" + scale + ")";
      this.previous_fs.style.opacity = opacity.toString();
      setTimeout(() => {
       
        this.animating = false;
      }, 800);
    }
  }
