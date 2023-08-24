import { Component  , ViewChild , ElementRef, OnInit  } from '@angular/core';
import { GenerateService } from '../services/generate.service';

@Component({
  selector: 'app-shopping-basket-page',
  templateUrl: './shopping-basket-page.component.html',
  styleUrls: ['./shopping-basket-page.component.css']
})
export class ShoppingBasketPageComponent implements OnInit{

  @ViewChild('categoriesList') 'categoriesList' : ElementRef

  products : any[] = [] ;

  basketShopping : any[] = [] ; 

  countIndex : number = 0

  constructor(private generate : GenerateService){}

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

  plusProductInShoppingBasket(){

    if([...new Set(this.generate.basketShoppingList)].length !== this.generate.basketShoppingList.length){

      if([...new Set(this.generate.basketShoppingList)].length === 1){

        this.basketShopping = this.generate.basketShoppingList
        
        this.products.forEach(item => this.basketShopping.push(item))
  
        this.products = [...new Set(this.generate.basketShoppingList)]
        
        console.log(this.basketShopping);
        
      }else{
        
        this.products = [...new Set(this.generate.basketShoppingList)]

      }

      
    }

    
  }

  


  
  minusProductInShoppingBasket(){
    
    // this.basketShopping.splice(this.basketShopping.length-1,1)
    
    // this.generate.basketShoppingList.splice(this.generate.basketShoppingList.length-1,1)

  }
  removeToShoppingBasket(){
    
    // this.basketShopping = []
    
    // this.generate.basketShoppingList.splice(this.generate.basketShoppingList.length-1,1)

  }

  ngOnInit(): void {

    // console.log(this.generate.basketShoppingList);
    

    // this.products = this.generate.basketShoppingList
    
    this.plusProductInShoppingBasket()
    
  }
}
