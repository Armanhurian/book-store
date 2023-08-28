import { Component , ViewChild , ElementRef, OnInit } from '@angular/core';
import { GenerateService } from '../services/generate.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit{

  @ViewChild('categoriesList') 'categoriesList' : ElementRef
  @ViewChild('showMenuElem') 'showMenuElem' : ElementRef

  constructor(private generate : GenerateService){}

  products : any[] = [] ;

  productArray : any[] = []

  showCategoryList(event:any){
    event.preventDefault()
    if(this.categoriesList.nativeElement.style.display!== 'block'){

      this.categoriesList.nativeElement.style.display = 'block'
      
    }else{

      this.categoriesList.nativeElement.style.display = 'none'
   
    }
    
    
  }

      
showMenuResponse(event : any){

    
  if(this.showMenuElem.nativeElement.style.display != 'block'){
    
    this.showMenuElem.nativeElement.style.display = 'block'

    event.target.style.backgroundColor = '#2778c4bd';
    
  }else{
    
    this.showMenuElem.nativeElement.style.display = 'none'

    event.target.style.backgroundColor = 'white';
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
