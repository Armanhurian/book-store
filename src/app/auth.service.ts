import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GenerateService } from './services/generate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate , OnInit{


  constructor(private generate : GenerateService , private router :Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    return true
    if(this.generate.favoriteProductList.length){
      
      
    }else{

      return false
    }

  }

  ngOnInit(): void {

    console.log(this.generate.favoriteProductList);
    
  }
  
}
