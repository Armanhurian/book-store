import { Component,OnInit , ElementRef ,ViewChild, HostListener } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-computer-page',
  templateUrl: './computer-page.component.html',
  styleUrls: ['./computer-page.component.css']
})
export class ComputerPageComponent implements OnInit{
  @ViewChild('showUserDes') 'showUserDes' : ElementRef
  @ViewChild('clickParent') 'clickParent' : ElementRef
  @ViewChild('categoriesList') 'categoriesList' : ElementRef
  @ViewChild('showPriceContainer') 'showPriceContainer' : ElementRef
  @ViewChild('changedIcon') 'changedIcon' : ElementRef
  @ViewChild('checkBoxOfferLable') 'checkBoxOfferLable' : ElementRef
  @ViewChild('inputRangeElemPrice') 'inputRangeElemPrice' : ElementRef
  @ViewChild('inputElemMinPrice') 'inputElemMinPrice' : ElementRef
  @ViewChild('inputElemMaxPrice') 'inputElemMaxPrice' : ElementRef


  constructor( private productService : ProductService ){}


  dashbordNameLists : any = []

  dashbordName : any =  ''

  currentPrices : number[] = []
  
  products : any[] = [] ;
  
  offerFilteredProducts : any[] = []
  
  rangePriceFilteredProducts : any[] = []
  

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

  clickIconHandle(){

    if(this.showPriceContainer.nativeElement.style.display !== 'flex'){

      this.showPriceContainer.nativeElement.style.display = 'flex'
      this.changedIcon.nativeElement.classList.remove('fa-chevron-down')
      this.changedIcon.nativeElement.classList.add('fa-chevron-up')
      
      
    }else{
      
      this.showPriceContainer.nativeElement.style.display = 'none'
      this.changedIcon.nativeElement.classList.remove('fa-chevron-up')
      this.changedIcon.nativeElement.classList.add('fa-chevron-down')
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

    this.dashbordNameFunc()
    
    this.products = this.productService.computerProductsInMainPage
    
    
    console.log(this.dashbordName);
  }

  offerLableClick(){

    console.log('offer click shod');

    this.offerFilteredProducts =  this.productService.computerProductsInMainPage.filter(item => item.Discount !== 0)
    

    if(!this.checkBoxOfferLable.nativeElement.className.includes('checkBoxActive')){

      this.checkBoxOfferLable.nativeElement.classList.add('checkBoxActive')

      this.products = this.offerFilteredProducts

      if(this.inputElemMinPrice.nativeElement.value != 0){

        this.products = this.offerFilteredProducts.filter(item => item.price >= Number(this.inputElemMinPrice.nativeElement.value))
        
      }
      
      
    }else{
      
      this.checkBoxOfferLable.nativeElement.classList.remove('checkBoxActive')
      
      this.products = this.productService.computerProductsInMainPage

      if(this.inputElemMinPrice.nativeElement.value != 0){

        this.products = this.productService.computerProductsInMainPage.filter(item => item.price >= Number(this.inputElemMinPrice.nativeElement.value))
        
      }
    }
    
     
  }

  changeInputRange(event:any){

    let newInputElemMaxPrice = [...this.inputElemMaxPrice.nativeElement.value].filter((item)=> item !== ',')
  
    this.inputElemMinPrice.nativeElement.value = Math.floor(Number(newInputElemMaxPrice.join('')) * (event.target.value/100))
    
    this.rangePriceFilteredProducts = this.productService.computerProductsInMainPage.filter( item => item.price >= Number(this.inputElemMinPrice.nativeElement.value))
    
    this.products = this.rangePriceFilteredProducts
   

    if(this.checkBoxOfferLable.nativeElement.className.includes('checkBoxActive')){

      this.products = this.rangePriceFilteredProducts.filter(item => item.Discount !== 0)
      
    }
  }
  
}
