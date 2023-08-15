import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HostListener } from '@angular/core'



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

  @ViewChild('showUserDes') 'showUserDes' : ElementRef
  @ViewChild('clickParent') 'clickParent' : ElementRef
  @ViewChild('categoriesList') 'categoriesList' : ElementRef


  dashbordNameLists : any = []


  dashbordName : any =  ''

  constructor( private Products : ProductService){}


  myComputerTypeProducts:any = [] 
  myScienceBookTypeProducts:any = [] 
  myEducationBookTypeProducts:any = [] 
  myRomanceBookTypeProducts:any = [] 
  myHistoricalBookTypeProducts:any = [] 
  myLanguagesBookTypeProducts:any = [] 


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
  

  ngOnInit(): void {

    this.myComputerTypeProducts = this.Products.computerProductsInMainPage.slice(0,10)


    this.myScienceBookTypeProducts = this.Products.scienceProductsInMainPage.slice(0,10)


    this.myEducationBookTypeProducts = this.Products.educationProductsInMainPage.slice(0,10)


    this.myHistoricalBookTypeProducts = this.Products.historicalProductsInMainPage.slice(0,10)


    this.myRomanceBookTypeProducts = this.Products.romanceProductsInMainPage.slice(0,10)


    this.myLanguagesBookTypeProducts = this.Products.languagesProductsInMainPage.slice(0,10)
    
    this.dashbordNameFunc()
      
    console.log(this.dashbordName);
    
    
  }
}
