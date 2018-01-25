import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {

  data: any;

  constructor(public http: HttpClient, private storage: Storage, private db: AngularFireDatabase) {
  }

  getQuizPlanets(){
    return this.db.list('/quizes/quizPlanets/v1');
  }

  getQuizInfo(){
    return this.db.list('quizInfo');
  }

  createUserQuizInfo(userId: String, username: String, newUser: Boolean) {
    if (newUser) {
      this.db.list('/userPoints/'+userId).push({
        userName: username
      });
    }
    
    this.db.list('quizInfo').snapshotChanges().map(actions => {
      return actions.map(action => (action.payload.val()));
    }).subscribe(items => {
        let listQuizInfo = items[0];
        listQuizInfo.array.forEach(quizInfo => {
          let quizVersion:number = quizInfo[0].lastVersion;

          this.db.list('/userPoints/'+userId+'/'+quizInfo[0]).valueChanges().subscribe(items => {
            if (items.length > 0) {
              let userLastQuizVersion:number = items[0][0].lastVersion;
              for (let i = userLastQuizVersion; i < quizVersion; i++){
                this.db.list('/userPoints/'+userId+'/'+quizInfo[0]+'/v'+(i+1)).push({});
              }
            } else {             
              for(let i = 1; i <= quizVersion; i++){
                this.db.list('/userPoints/'+userId+'/'+quizInfo[0]+'/v'+i).push({});
              }              
            }
          })

        });
      });
  }

  load(){

    if(this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/questions.json')
      .subscribe(data => { 
        this.data = data;
        resolve(this.data);
      }, err => {
        console.log(err);
      });

    });
  }

  loadYesNo(){

    if(this.data){
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get('assets/data/questionsYesNo.json')
      .subscribe(data => { 
        this.data = data;
        resolve(this.data);
      }, err => {
        console.log(err);
      });

    });
  }

}

