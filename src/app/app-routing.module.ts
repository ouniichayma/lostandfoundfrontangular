import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './dashboards/user/user.component';
import { AdminComponent } from './dashboards/admin/admin.component';
import { UpdateComponent } from './crud/update/update.component';
import { JustificatifobjComponent } from './components/justificatifobj/justificatifobj.component';
import { AddLostObjectComponent } from './components/add-lost-object/add-lost-object.component';
import { AddFoundObjectComponent } from './components/add-found-object/add-found-object.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './services/guard/auth.guard';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'user',component:UserComponent,canActivate:[AuthGuard]},
  
  {path:'admin',component:AdminComponent,canActivate:[AuthGuard]},
  { path: '', component:HomeComponent},

  { path: 'edit/:id', component: UpdateComponent },

  { path: 'object-just/:id', component: JustificatifobjComponent },
  
         { path: 'user/AddLost', component: AddLostObjectComponent },
     { path: 'user/AddFound', component: AddFoundObjectComponent },
         { path: 'about', component: AboutComponent },

   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
