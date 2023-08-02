import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  @ViewChild('showUserDes') 'showUserDes' : ElementRef
  @ViewChild('clickParent') 'clickParent' : ElementRef
  @ViewChild('categoriesList') 'categoriesList' : ElementRef

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
}
