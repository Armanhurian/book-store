import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { FormControl , FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { GenerateService } from '../services/generate.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{

  @ViewChild('showUserDes') 'showUserDes' : ElementRef
  @ViewChild('clickParent') 'clickParent' : ElementRef
  @ViewChild('categoriesList') 'categoriesList' : ElementRef
  @ViewChild('emailTextValue') 'emailTextValue' : ElementRef
  @ViewChild('textareaValue') 'textareaValue' : ElementRef

  dashbordNameLists : any = []


  dashbordName : any =  ''

  like : boolean = false

  count : number = 0

  constructor(private generate : GenerateService){}

  dashbordNameFunc(){
    this.dashbordNameLists.push(localStorage.getItem('dashbordName'))
    this.dashbordNameLists.push(localStorage.getItem('nameValueInput'))
    this.dashbordName = this.dashbordNameLists[this.dashbordNameLists.length - 1]
  }

  logoutHandler(){
    console.log('log out');
    localStorage.clear()
  }

  showUserDescription(){

    if(this.showUserDes.nativeElement.style.opacity!== '1'){

      this.showUserDes.nativeElement.style.opacity = '1'
      this.showUserDes.nativeElement.style.visibility = 'visible'
      this.clickParent.nativeElement.style.backgroundColor = '#f2747466'
      this.clickParent.nativeElement.style.borderRadius = '0.4rem'
    }else{
      this.showUserDes.nativeElement.style.opacity = '0'
      this.showUserDes.nativeElement.style.visibility = 'hidden'
      this.clickParent.nativeElement.style.backgroundColor = 'white'
      
    }
    
  }
  showCategoryList(event:any){
    event.preventDefault()
    if(this.categoriesList.nativeElement.style.opacity!== '1'){
  
      this.categoriesList.nativeElement.style.opacity = '1'
      this.categoriesList.nativeElement.style.visibility = 'visible'

    }else{
      this.categoriesList.nativeElement.style.opacity = '0'
      this.categoriesList.nativeElement.style.visibility = 'hidden'
   
    }
    
    
  }

  myFormGroup = new FormGroup({
    email : new FormControl(''),
    textarea : new FormControl(''),
  })

  emailRegex = /^(\w+@\w{5}\.)\w{3}$/g

  submitComment(){

    console.log(this.myFormGroup.value.email);
    console.log(this.myFormGroup.value.textarea);

    if(this.myFormGroup.value.email && this.myFormGroup.value.textarea){
      if(!this.emailRegex.test(this.myFormGroup.value.email)){
        Swal.fire(
          {
            title: 'متاسفم !',
            text : '  فرمت ایمیل وارد شده اشتباه است !',
            confirmButtonText: 'متوجه شدم ',
            icon : 'error'
          }
        )
      }else{
        Swal.fire(
          {
            title: 'تبریک',
            text : ' نظر و پیشنهاد شما با موفقیت ارسال شد',
            confirmButtonText: 'متوجه شدم',
            icon : 'success'
          }
        ).then((res)=>{
          if(res){
            this.emailTextValue.nativeElement.value = ''
            this.textareaValue.nativeElement.value = ''
          }
      })
      }
    }else{
      Swal.fire(
        {
          title: 'متاسفم !',
          text : ' لطفا اطلاعات مورد نظر را کامل کنید',
          confirmButtonText: 'متوجه شدم ',
          icon : 'error'
        }
      )
    }
    
  }
  

  ngOnInit(): void {

    if(this.generate.favoriteProductList.length){

      this.like = true

    }else{
   
      this.like = false
    }

    this.count = this.generate.basketShoppingList.length

    this.dashbordNameFunc()
      
    console.log(this.dashbordName);
  }
}
