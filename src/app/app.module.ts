import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserComponent } from './dashboards/user/user.component';
import { AdminComponent } from './dashboards/admin/admin.component';
import { UpdateComponent } from './crud/update/update.component';
import { JustificatifobjComponent } from './components/justificatifobj/justificatifobj.component';
import { AddLostObjectComponent } from './components/add-lost-object/add-lost-object.component';
import { AddFoundObjectComponent } from './components/add-found-object/add-found-object.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    AdminComponent,
    UpdateComponent,
    JustificatifobjComponent,
    AddLostObjectComponent,
    AddFoundObjectComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
   
    BrowserAnimationsModule,
   
     
    ReactiveFormsModule, 
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
