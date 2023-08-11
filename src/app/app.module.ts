import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomePageComponent } from './welcome-page/welcome-page/welcome-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainPageComponent } from './main-page/main-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component'

const routes : Routes = [
  {path : '' , children : [
    {path : '' ,component : WelcomePageComponent},
    {path : 'welcome' , component : HomePageComponent},
    {path : 'login' , component : LoginPageComponent},
    {path : 'register' , component : RegisterPageComponent},
    {path : 'main' , component : MainPageComponent},
    {path : 'about-us' , component : AboutUsComponent},
    {path : 'contact' , component : ContactComponent},
    {path : '404' , component : NotFoundComponent},
    {path : '**' , redirectTo : '/404'},
  ]},
]

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    HomePageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    MainPageComponent,
    AboutUsComponent,
    ContactComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas :[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
