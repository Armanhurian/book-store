import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateService{

  constructor() { }

  favoriteProductList : any[] = []

  basketShoppingList : any[] = []
}
