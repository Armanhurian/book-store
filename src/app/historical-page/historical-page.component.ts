import { Component ,OnInit , ElementRef ,ViewChild } from '@angular/core';
import { GenerateService } from '../services/generate.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-historical-page',
  templateUrl: './historical-page.component.html',
  styleUrls: ['./historical-page.component.css']
})
export class HistoricalPageComponent implements OnInit {
  @ViewChild('showUserDes') 'showUserDes' : ElementRef
  @ViewChild('clickParent') 'clickParent' : ElementRef
  @ViewChild('categoriesList') 'categoriesList' : ElementRef
  @ViewChild('showPriceContainer') 'showPriceContainer' : ElementRef
  @ViewChild('changedIcon') 'changedIcon' : ElementRef
  @ViewChild('offerLableChanged') 'offerLableChanged' : ElementRef
  @ViewChild('sendSpecialLableChanged') 'sendSpecialLableChanged' : ElementRef
  @ViewChild('checkBoxOfferLable') 'checkBoxOfferLable' : ElementRef
  @ViewChild('checkBoxSendSpecialLable') 'checkBoxSendSpecialLable' : ElementRef
  @ViewChild('inputRangeElemPrice') 'inputRangeElemPrice' : ElementRef
  @ViewChild('inputElemMinPrice') 'inputElemMinPrice' : ElementRef
  @ViewChild('inputElemMaxPrice') 'inputElemMaxPrice' : ElementRef
  @ViewChild('myInputSearchValue') 'myInputSearchValue' : ElementRef
  @ViewChild('showMenuElem') 'showMenuElem' : ElementRef
  @ViewChild('navBarListElem') 'navBarListElem' : ElementRef
  @ViewChild('navbarContainerElem') 'navbarContainerElem' : ElementRef

  inputSearchText : string = ''

  dashbordNameLists : any = []

  dashbordName : any =  ''

  currentPrices : number[] = []
  
  products : any[] = [] ;

  like : boolean = false

  count : number = 0
  
  offerFilteredProducts : any[] = []
  
  rangePriceFilteredProducts : any[] = []

  sendSpecialFilteredProducts : any[] = []

  constructor(private productService : ProductService , private generate : GenerateService){}


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
    
  }
  
  clickSearchHandler(){

    this.inputElemMinPrice.nativeElement.value = 0

    this.inputRangeElemPrice.nativeElement.value = 0

    this.offerLableChanged.nativeElement.checked = false

    this.checkBoxOfferLable.nativeElement.classList.remove('checkBoxActive')

    this.sendSpecialLableChanged.nativeElement.checked = false

    this.checkBoxSendSpecialLable.nativeElement.classList.remove('checkBoxActive')

    this.products = this.productService.historicalProductsInMainPage.filter(item => item.title.includes(this.myInputSearchValue.nativeElement.value))

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

    this.dashbordNameFunc()  
    
    this.products = this.productService.historicalProductsInMainPage
    
    
    console.log(this.dashbordName);
  }

  offerLableClick(){

    this.myInputSearchValue.nativeElement.value = ''

    this.offerFilteredProducts =  this.productService.historicalProductsInMainPage.filter(item => item.Discount !== 0)
    
    if(!this.checkBoxOfferLable.nativeElement.className.includes('checkBoxActive')){

      this.checkBoxOfferLable.nativeElement.classList.add('checkBoxActive')

      this.products = this.offerFilteredProducts

      if(this.inputElemMinPrice.nativeElement.value != 0){

        this.products = this.offerFilteredProducts.filter(item => item.price >= Number(this.inputElemMinPrice.nativeElement.value))
        
      }
      
      if(this.checkBoxSendSpecialLable.nativeElement.className.includes('checkBoxActive')){

        this.products = this.products.filter(item => item.fastSending === true)

      }
      
    }else{
      
      this.checkBoxOfferLable.nativeElement.classList.remove('checkBoxActive')
      
      this.products = this.productService.historicalProductsInMainPage

      if(this.inputElemMinPrice.nativeElement.value != 0){

        this.products = this.productService.historicalProductsInMainPage.filter(item => item.price >= Number(this.inputElemMinPrice.nativeElement.value))
        
      }

      if(this.checkBoxSendSpecialLable.nativeElement.className.includes('checkBoxActive')){

        this.products = this.products.filter(item => item.fastSending === true)

      }
    }
    
     
  }

  changeInputRange(event:any){

    this.myInputSearchValue.nativeElement.value = ''

    let newInputElemMaxPrice = [...this.inputElemMaxPrice.nativeElement.value].filter((item)=> item !== ',')
  
    this.inputElemMinPrice.nativeElement.value = Math.floor(Number(newInputElemMaxPrice.join('')) * (event.target.value/100))
    
    this.rangePriceFilteredProducts = this.productService.historicalProductsInMainPage.filter( item => item.price >= Number(this.inputElemMinPrice.nativeElement.value))
    
    this.products = this.rangePriceFilteredProducts
   

    if(this.checkBoxOfferLable.nativeElement.className.includes('checkBoxActive')){

      this.products = this.rangePriceFilteredProducts.filter(item => item.Discount !== 0)
      
    }

    if(this.checkBoxSendSpecialLable.nativeElement.className.includes('checkBoxActive')){

      this.products = this.products.filter(item => item.fastSending === true)

    }
  }
  
  sendSpecialClick(){

    this.sendSpecialFilteredProducts = this.productService.historicalProductsInMainPage.filter(item => item.fastSending === true)

    this.myInputSearchValue.nativeElement.value = ''
    
    if(!this.checkBoxSendSpecialLable.nativeElement.className.includes('checkBoxActive')){
      
      this.checkBoxSendSpecialLable.nativeElement.classList.add('checkBoxActive')
      
      this.products = this.sendSpecialFilteredProducts 

      if(this.inputElemMinPrice.nativeElement.value != 0){

        this.products = this.sendSpecialFilteredProducts.filter(item => item.price >= Number(this.inputElemMinPrice.nativeElement.value))
        
      }

      if(this.checkBoxOfferLable.nativeElement.className.includes('checkBoxActive')){

        this.products = this.products.filter(item => item.Discount !== 0)

      }
      
    }else{
      
      this.checkBoxSendSpecialLable.nativeElement.classList.remove('checkBoxActive')
      
      this.products = this.productService.historicalProductsInMainPage

      if(this.inputElemMinPrice.nativeElement.value != 0){

        this.products = this.productService.historicalProductsInMainPage.filter(item => item.price >= Number(this.inputElemMinPrice.nativeElement.value))
        
      }

      if(this.checkBoxOfferLable.nativeElement.className.includes('checkBoxActive')){

        this.products = this.products.filter(item => item.Discount !== 0)

      }

    }
    
  }


}
