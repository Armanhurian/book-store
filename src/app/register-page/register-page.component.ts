import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import swal from 'sweetalert2'
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  // users : any = []
  
  

  alphabet : string[] = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',]

  @ViewChild ('nameText') 'nameText' : ElementRef
  @ViewChild ('emailText') 'emailText' : ElementRef
  @ViewChild ('passwordErrorText') 'passwordErrorText' : ElementRef

  @ViewChild ('passwordText') 'passwordText' : ElementRef
  @ViewChild ('nameTextValue') 'nameTextValue' : ElementRef
  @ViewChild ('myEmailTextValue') 'myEmailTextValue' : ElementRef
  @ViewChild ('passwordTextRepeat') 'passwordTextRepeat' : ElementRef

  nameInputValue : string = ''
  emailTextValue : string = ''
  passwordRepeatTextValue : string = ''

  emailRegex = /^(\w+@\w{5}\.)\w{3}$/g

  constructor (private http : HttpClient ,private router : Router , private dataService : DataService){}

  updateNameValue(){

    if(this.alphabet.includes([...this.nameInputValue][0])){

      this.nameText.nativeElement.innerHTML = 'لطفا نام خود را به فارسی وارد کنید'
    }else{
      
      this.nameText.nativeElement.innerHTML = ''
    }
    
  }

  updateEmailValue(){{
    
    

    if(!this.emailRegex.test(this.emailTextValue)){

      this.emailText.nativeElement.innerHTML = 'فرمت ایمیل را به درستی وارد کنید'

    }else{

      this.emailText.nativeElement.innerHTML = ''

    }
    
  }}

  checkInputPassword(){

    if(this.passwordRepeatTextValue !== this.passwordText.nativeElement.value){
      
      this.passwordErrorText.nativeElement.innerHTML = 'متاسفانه رمزعبورها هم خوانی ندارند'
      
    }else{
      
      this.passwordErrorText.nativeElement.innerHTML = ''
      
    }
    
  }

  clickSubmitRegister(event : any){

      
      //console.log(this.users);


    event.preventDefault()

  if(this.passwordErrorText.nativeElement.innerHTML === '' && this.emailText.nativeElement.innerHTML === '' && this.nameText.nativeElement.innerHTML === '' ){

    if(this.passwordText.nativeElement.value !== '' && this.nameTextValue.nativeElement.value !== '' && this.myEmailTextValue.nativeElement.value !== '' && this.passwordTextRepeat.nativeElement.value !== '' ){
  
      swal.fire(
        {
          title: 'تبریک',
          text : 'ثبت نام شما با موفقیت انجام شد',
          confirmButtonText: 'ورود به صفحه اصلی',
          icon : 'success'
        }
      ).then((res)=>{if(res.value){
         this.router.navigate(['main'])
      }})

      let userObj = {
        name : this.nameTextValue.nativeElement.value,
        email : this.myEmailTextValue.nativeElement.value,
        password : this.passwordText.nativeElement.value
      }
      
      
      
      this.http.post('https://jsonplaceholder.typicode.com/posts',userObj).pipe(

        map((item)=>{

          let users = this.dataService.prevUser
          localStorage.setItem('token',JSON.stringify(item))
          let getMyData = localStorage.getItem('token')
          let getParseData = getMyData ? JSON.parse(getMyData) : []
          users.push(getParseData)
          localStorage.setItem('users',JSON.stringify(users))
      
          
        })
        ).subscribe((data:any)=>{})
        
        
        
        // 
        
        
        this.http.get('https://blokchainology.com/api/api/v1/tasks/').subscribe((data)=>{console.log(data)})
      
      
    }else if(this.passwordText.nativeElement.value === '' || this.nameTextValue.nativeElement.value === '' || this.myEmailTextValue.nativeElement.value === '' || this.passwordTextRepeat.nativeElement.value === '' ){
      swal.fire(
        {
          title: 'متاسفم !',
          text : ' لطفا اطلاعات خود را تکمیل کنید',
          confirmButtonText: 'متوجه شدم ',
          icon : 'error'
        }
      )
      
    } 
  }else{

    swal.fire(
      {
        title: 'متاسفم !',
        text : ' لطفا اطلاعات خود را دوباره بررسی کنید',
        confirmButtonText: 'متوجه شدم ',
        icon : 'error'
      }
    )

  }
    
    
    

  }

  
  ngOnInit():void{


  }

}
