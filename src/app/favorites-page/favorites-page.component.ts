import { Component , ViewChild , ElementRef, OnInit } from '@angular/core';
import { GenerateService } from '../services/generate.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit{

  @ViewChild('categoriesList') 'categoriesList' : ElementRef

  constructor(private generate : GenerateService){}

  products : any[] = [] ;

  productArray : any[] = []

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
    
    this.products = [...new Set(this.generate.favoriteProductList)]
    
  }

  removeOnFavorites(title : any){ 

    let index = this.generate.favoriteProductList.findIndex(item => item.title.includes(title))

    this.generate.favoriteProductList.splice(index , 1)

    this.products = [...new Set(this.generate.favoriteProductList)]
  
    console.log(this.products);
     
  }

}
