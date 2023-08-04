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


  constructor( private Products : ProductService){}


  myComputerTypeProducts:any = [] 
  myScienceBookTypeProducts:any = [] 
  myEducationBookTypeProducts:any = [] 
  myRomanceBookTypeProducts:any = [] 
  myHistoricalBookTypeProducts:any = [] 
  myLanguagesBookTypeProducts:any = [] 



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

    this.myComputerTypeProducts = this.Products.computerProductsInMainPage


    this.myScienceBookTypeProducts = this.Products.scienceProductsInMainPage


    this.myEducationBookTypeProducts = this.Products.educationProductsInMainPage


    this.myHistoricalBookTypeProducts = this.Products.historicalProductsInMainPage


    this.myRomanceBookTypeProducts = this.Products.romanceProductsInMainPage


    this.myLanguagesBookTypeProducts = this.Products.languagesProductsInMainPage 
    
  }
}
