import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert2'
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPageComponent implements OnInit{

  constructor(private dataService :DataService , private router : Router){}

  nameText:string = ''
  
  passwordText:string = ''

  listOfUsers :any ; 
  
  loginUser(){

   this.listOfUsers = this.dataService.loginSubmit()

   
   console.log(JSON.parse(this.listOfUsers));

   if(JSON.parse(this.listOfUsers)){
    let filteredUsers = JSON.parse(this.listOfUsers).filter((item:any)=>{
      return item.name.trim() === this.nameText 
    })
 
    if(this.nameText === '' || this.passwordText === ''){
     swal.fire(
       {
         title: 'متاسفم !',
         text : ' لطفا اطلاعات خود را کامل کنید',
         confirmButtonText: 'متوجه شدم ',
         icon : 'error'
       }
     )
    }else{
 
      if(!filteredUsers.length){
   
        swal.fire(
         {
           title: 'متاسفم !',
           text : ' شما با این نام از قبل ثبت نام نکردید لطفا ابتدا ثبت نام کنید',
           confirmButtonText: ' ورود به صفحه ثبت نام ',
           icon : 'error'
         }
       ).then((res)=>{this.router.navigate(['/register'])})
       this.nameText = ''
       this.passwordText = ''
      }else{
        if(this.passwordText === filteredUsers[0].password){
         swal.fire(
           {
             title: 'تبریک',
             text : ' درخواست ورود شما با موفقیت انجام شد',
             confirmButtonText: 'ورود به صفحه اصلی',
             icon : 'success'
           }
         ).then((res)=>{if(res.value){
            this.router.navigate(['main'])
            localStorage.setItem('dashbordName', this.nameText)      
         }})
        }else{
         swal.fire(
           {
             title: 'متاسفم !',
             text : ' متاسفانه رمز عبور شما اشتیاه است لطفا مجددا امتحان کنید',
             confirmButtonText: ' متوجه شدم ',
             icon : 'error'
           }
         )
          this.nameText = ''
          this.passwordText = ''
        }
      }
    }
 
  
   }else{
    swal.fire(
      {
        title: 'متاسفم !',
        text : ' شما با این نام از قبل ثبت نام نکردید لطفا ابتدا ثبت نام کنید',
        confirmButtonText: ' ورود به صفحه ثبت نام ',
        icon : 'error'
      }
    ).then((res)=>{this.router.navigate(['/register'])})
    this.nameText = ''
    this.passwordText = ''
   }
   
  
  }
  
  ngOnInit(): void {
    
    this.dataService.loginSubmit()
    
  }
}
