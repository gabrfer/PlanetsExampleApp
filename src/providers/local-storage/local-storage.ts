import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LocalStorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalStorageProvider {

  constructor(public http: HttpClient, private storage: Storage) {
  }

  getValue(key){
    this.storage.get(key).then((val) => {
      return val;
    });
  }

  setValue(key, value){
    this.storage.set(key, value);
  }

  getObject(key):Promise<any>{
    return this.storage.get(key);

    /* return new Promise(resolve => {
      this.storage.get('key').then((data) => {
        resolve(data);
      });
    }) */

  }

  setObject(key, value){
    this.storage.set(key, JSON.stringify(value));
  }

}
