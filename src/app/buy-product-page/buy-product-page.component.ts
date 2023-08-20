import { Component ,OnInit , ElementRef ,ViewChild, HostListener } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { GenerateService } from '../services/generate.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-buy-product-page',
  templateUrl: './buy-product-page.component.html',
  styleUrls: ['./buy-product-page.component.css']
})
export class BuyProductPageComponent implements OnInit{


  constructor( private productService : ProductService , private route : ActivatedRoute , private generate :GenerateService){}

  @ViewChild('showUserDes') 'showUserDes' : ElementRef
  @ViewChild('clickParent') 'clickParent' : ElementRef
  @ViewChild('categoriesList') 'categoriesList' : ElementRef
  @ViewChild('alertBoxForSharingLink') 'alertBoxForSharingLink' : ElementRef

  dashbordNameLists : any = []

  dashbordName : any =  ''

  productId ?: number | string ;

  products : any[] = []

  like : boolean = false

  basketShopping : any[] = []

  count : any ;

  textUrl : string = ''

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

  copyShareLink(){

    this.textUrl = location.href
    navigator.clipboard.writeText(this.textUrl)
    this.alertBoxForSharingLink.nativeElement.style.opacity = 1
    this.alertBoxForSharingLink.nativeElement.style.visibility = 'visible'
    let num = 0

    let observable = new Observable((suber)=>{
      setInterval(()=>{
        num++
        suber.next(num)
        
        if(num===4){
          suber.complete()
          this.alertBoxForSharingLink.nativeElement.style.opacity = 0
          this.alertBoxForSharingLink.nativeElement.style.visibility = 'hidden'
        }
      },1000)
    }).subscribe((data)=>console.log(data))


  }
   
  ngOnInit(): void {

    console.log(location.href);
    
    this.dashbordNameFunc()
    
    this.productId = Number(this.route.snapshot.params['id'])

    this.products = this.productService.computerProductsInMainPage.filter(item => item.id === this.productId)
    
  }

  plusProductInShoppingBasket(){

    this.products.forEach( item => this.basketShopping.push(item))

    this.products.forEach( item => this.generate.basketShoppingList.push(item))
    
  }
  
  minusProductInShoppingBasket(){
    
    this.basketShopping.splice(this.basketShopping.length-1,1)
    
    this.generate.basketShoppingList.splice(this.generate.basketShoppingList.length-1,1)

  }
  removeToShoppingBasket(){
    
    this.basketShopping = []
    
    this.generate.basketShoppingList.splice(this.generate.basketShoppingList.length-1,1)

  }
  addToShoppingBasket(){
    
    this.products.forEach( item => this.basketShopping.push(item))

    this.basketShopping.forEach(item => this.generate.basketShoppingList.push(item))

  }

  addToFavorite(event:any){

    if(!this.like ){

      this.products.forEach( item =>  this.generate.favoriteProductList.push(item))

      event.target.style.color = 'red'

      this.like = true
      
      console.log(this.generate.favoriteProductList);
      
    }else{
      

      this.generate.favoriteProductList.splice(this.generate.favoriteProductList.length-1,1)
      
      event.target.style.color = 'black'
      
      this.like = false
      
      console.log(this.generate.favoriteProductList);
    }
  }
}
