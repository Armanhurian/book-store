import { Component,OnInit , ElementRef ,ViewChild } from '@angular/core';

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
  @ViewChild('inputElemMinPrice') 'inputElemMinPrice' : ElementRef
  @ViewChild('inputElemMaxPrice') 'inputElemMaxPrice' : ElementRef


  dashbordNameLists : any = []


  dashbordName : any =  ''


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

    }else{
      
      this.showPriceContainer.nativeElement.style.display = 'none'
    }
    
    
  }

  changeInputRange(event:any){
    console.log(event.target.value/100);
    let newInputElemMaxPrice = [...this.inputElemMaxPrice.nativeElement.value].filter((item)=> item !== ',')
    console.log(Number(newInputElemMaxPrice.join('')));
    
    this.inputElemMinPrice.nativeElement.value = Math.floor(Number(newInputElemMaxPrice.join('')) * (event.target.value/100))
   
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
      
    console.log(this.dashbordName);
  }
}
