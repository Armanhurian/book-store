import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http : HttpClient) { }

  prevUser:any = []
  
  getMyData:any ;
  
  //users:object[] = this.dataService.prevUser
  
  
  loginSubmit(){
    
    let localTotal = localStorage.getItem('users')

    return localTotal
    
  }

  
}
