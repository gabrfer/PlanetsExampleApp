import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/take';
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

  getQuizByName(quizName, version){
    return this.db.list('/quizes/'+quizName+'/v'+version);
  }

  getQuizInfo(){
    return this.db.list('quizInfo');
  }

  createUserQuizInfo(userId: String, newUser: Boolean, displayName: String = "") {
    if (newUser) {
      this.db.list('/userPoints/').set(""+userId,{
        userName: displayName
      });
    }
    
    this.db.list('quizInfo').snapshotChanges().map(actions => {
      return actions.map(action => (action.payload.val()));
    }).subscribe(items => {

      items.forEach((quizInfo) => {
          let quizVersion:number = quizInfo.lastVersion;

          this.db.object('/userPoints/'+userId+'/'+quizInfo.name).snapshotChanges().take(1)
            .subscribe((obj) => {
              if (obj.hasOwnProperty('$value') && !obj['$value']) {
                let userLastQuizVersion:number = items[0].lastVersion;

                for (let i = userLastQuizVersion; i < quizVersion; i++){
                  this.db.list('/userPoints/'+userId+'/'+quizInfo.name).set('/v'+(i+1),{
                    puntuation: 0
                  });
                }             
             } else {
                this.db.list('/userPoints/'+userId).set(quizInfo.name, {
                  lastVersion: quizVersion,
                  userActualVersion: 1
                });
                
                for (let i = 1; i <= quizVersion; i++){
                  this.db.list('/userPoints/'+userId+'/'+quizInfo.name).set('/v'+i, {
                    puntuation: 0
                  });
                } 
             }
          });
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

