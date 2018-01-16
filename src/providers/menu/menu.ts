import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MenuServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MenuProvider Provider');
  }

  getMenus(){
    return this.http.get('assets/data/menus.json')
     .map((response:Response)=>response);
  }

}
