import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})
export class WelcomePageComponent implements  OnInit , OnDestroy{

  private subscription : any

  constructor(private router : Router){}

  welcomeText = 'در حال بارگزاری  ...'

  alphabetIndex = ''
  count = -1


  redirectToNextPage(){
    let urlObservable = new Observable ((suber)=>{
      setInterval(()=>{
        if(location.href === 'http://localhost:4200/'){

          suber.next(this.router.navigate(['welcome']))
        }  
      },6000)
      
    })

     this.subscription =  urlObservable.subscribe((data)=>{console.log(data)})
  }

  ngOnInit(): void {

    this.redirectToNextPage()

    console.log(this.welcomeText.length);

    let observable = new Observable ((suber)=>{
      
      setInterval(()=>{
    
        this.count++
  
        suber.next(this.welcomeText[this.count]) 
  
        if(this.count === 20){
          this.alphabetIndex = ''
          this.count = -1
        }
        
      },100)

      
    }).subscribe((data)=>{this.alphabetIndex += data})

  }
  
  
  ngOnDestroy(): void {
    
      this.subscription.unsubscribe()
    }
  }


