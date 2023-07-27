import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page/welcome-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes : Routes = [
  {path : '' , children : [
    {path : '' ,component : WelcomePageComponent},
    {path : 'welcome' , component : HomePageComponent},
    {path : 'login' , component : LoginPageComponent},
    {path : 'register' , component : RegisterPageComponent},
  ]},
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
