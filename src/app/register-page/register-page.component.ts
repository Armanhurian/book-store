import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import swal from 'sweetalert2'


@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{


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
      )
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
