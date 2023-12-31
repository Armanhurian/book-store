import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HostListener } from '@angular/core'
import { GenerateService } from '../services/generate.service';
import { FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{

  @ViewChild('showUserDes') 'showUserDes' : ElementRef
  @ViewChild('clickParent') 'clickParent' : ElementRef
  @ViewChild('categoriesList') 'categoriesList' : ElementRef
  @ViewChild('myInputSearchValue') 'myInputSearchValue' : ElementRef
  @ViewChild('showMenuElem') 'showMenuElem' : ElementRef
  @ViewChild('navBarListElem') 'navBarListElem' : ElementRef
  @ViewChild('navbarContainerElem') 'navbarContainerElem' : ElementRef


  products : any[] = [] ;

  inputSearchText : string = ''

  categoriesTitle : string = ''

  inputSearch: any = ''

  dashbordNameLists : any = []

  countBasketShopping ?: string | number;

  dashbordName : any =  ''

  like : boolean = false

  count : number = 0

  constructor( private Products : ProductService , private generate : GenerateService){}


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
  
  inputSearchValue = new FormGroup({

    searchValue  : new FormControl('')
    
  })

  
  keyUpSearchInput(event:any){

    if(event.target.value){

      this.inputSearchText = event.target.value
      
    }else{
       
      this.inputSearchText = ''
      
    }
    
  }
  
  
  removeSearch(){

    this.myInputSearchValue.nativeElement.value = ''
    this.inputSearchText = ''
    this.inputSearchValue.value.searchValue = ''
    
  }

  clickSearchHandler(){

    this.inputSearch =  this.inputSearchValue.value.searchValue

    this.products = this.Products.computerProductsInMainPage.concat(

      this.Products.educationProductsInMainPage,
      this.Products.historicalProductsInMainPage,
      this.Products.languagesProductsInMainPage,
      this.Products.romanceProductsInMainPage,
      this.Products.scienceProductsInMainPage

    )


    this.products = this.products.filter(item => item.title.includes(this.inputSearch))

    
    

  }


  showMenuResponse(event : any){
    
    if(this.showMenuElem.nativeElement.style.opacity != 1){
      
      this.showMenuElem.nativeElement.style.opacity = 1 

      this.showMenuElem.nativeElement.style.visibility = 'visible'  

      event.target.style.backgroundColor = '#2778c4bd';
      
    }else{
      
      this.showMenuElem.nativeElement.style.opacity = 0 

      this.showMenuElem.nativeElement.style.visibility = 'hidden'  

      event.target.style.backgroundColor = 'white';
    }

  }

  showCategoryListResponsive(){
    if(this.categoriesList.nativeElement.style.display != 'block'){

      this.categoriesList.nativeElement.style.display = 'block'
    }else{
      
      this.categoriesList.nativeElement.style.display = 'none'
    }
  }

  
  
  
  
  ngOnInit(): void {

    if(this.generate.favoriteProductList.length){

      this.like = true

    }else{
   
      this.like = false
    }
    
    this.count = this.generate.basketShoppingList.length


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
