import { Component  , ViewChild , ElementRef, OnInit  } from '@angular/core';
import { GenerateService } from '../services/generate.service';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

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

  oneCount : number = 0

  anyCount :number = 0

  dashbordNameLists : any = []

  dashbordName : any =  ''

  totalPrice : number = 0

  constructor(private generate : GenerateService , private router : Router){}

  dashbordNameFunc(){
    this.dashbordNameLists.push(localStorage.getItem('dashbordName'))
    this.dashbordNameLists.push(localStorage.getItem('nameValueInput'))
    this.dashbordName = this.dashbordNameLists[this.dashbordNameLists.length - 1]
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

  plusProductInShoppingBasket(myProduct:any){

    this.products = this.generate.basketShoppingList

    this.basketShopping = this.products

    this.basketShopping.push(myProduct)

    console.log(this.basketShopping);

    this.totalPrice += myProduct.price


    console.log(this.totalPrice);


  
  }
  
  removeProductInShoppingBasket(myProduct:any){
    

    
    let indexMinus = this.basketShopping.findIndex(item => item == myProduct)
    
    console.log(indexMinus);

    this.basketShopping.splice(indexMinus,1)

    this.totalPrice -= myProduct.price


    console.log(this.totalPrice);

  }
  


totalPriceFunc(){

  for (let index = 0; index < this.basketShopping.length; index++) {

    this.totalPrice += this.basketShopping[index].price

    console.log(this.totalPrice);
    

  }

}


submitBtnForPay(){
  if(this.dashbordName){
    swal.fire(
      {
        title: 'تبریک',
        text : 'سبد خرید شما با موفقیت ثبت شد',
        confirmButtonText: 'ورود به درگاه پرداخت',
        icon : 'success'
      }
    )
  }else{
    swal.fire(
      {
        title: 'متاسفم !',
        text : ' لطفا ابتدا وارد شوید',
        confirmButtonText: ' ورود به صفحه لاگین ',
        icon : 'error'
      }
    ).then((res)=>{
      if(res){
        this.router.navigate(['/login'])
      }
    })
  }
}



ngOnInit(): void {

   
  
    this.products = this.generate.basketShoppingList


    this.basketShopping = this.products

    this.dashbordNameFunc() 

    this.totalPriceFunc()

    console.log(this.dashbordName);
    
  }
}
