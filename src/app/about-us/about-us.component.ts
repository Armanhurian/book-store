import { Component, OnInit , ElementRef ,ViewChild} from '@angular/core';
import { GenerateService } from '../services/generate.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit{

  @ViewChild('showUserDes') 'showUserDes' : ElementRef
  @ViewChild('clickParent') 'clickParent' : ElementRef
  @ViewChild('categoriesList') 'categoriesList' : ElementRef

  dashbordNameLists : any = []


  dashbordName : any =  ''

  like : boolean = false

  count : number = 0

  constructor(private generate : GenerateService){}

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
  

  ngOnInit(): void {

    if(this.generate.favoriteProductList.length){

      this.like = true

    }else{
   
      this.like = false
    }

    this.count = this.generate.basketShoppingList.length

    this.dashbordNameFunc()
      
    console.log(this.dashbordName);
  }
}
