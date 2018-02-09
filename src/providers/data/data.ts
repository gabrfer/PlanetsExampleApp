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

  createUserQuizInfo(userId: String, newUser: Boolean, displayName: String = "", imageData: any = null) {
    if (newUser) {
      this.db.list('/userPoints/').set(""+userId,{
        displayName: displayName,
        imgAvatar: imageData
      });
    }
    
    /* Se recorre la lista de quizes en la base de datos, para comprobar los que le faltan
     * al usuario, o las versiones de estos que le faltan 
     * 
     * La estructura de la rama en BD dedicada a los puntos del usuario es la siguiente:
     * 
     *   -Username
     *        -QuizName
     *            -QuizLastVersion: 3
     *            -UserActualVersion: 1
     *            -Version 1 { 
     *                puntuation = 10
     *             }
     *            -Version 2 { 
     *                puntuation = 25 
     *             }
     *            -Version 3 { 
     *                puntuation = 30 
     *             }
     */
    this.db.list('quizInfo').snapshotChanges().map(actions => {
      return actions.map(action => (action.payload.val()));
    }).subscribe(items => {

      items.forEach((quizInfo) => {
          let quizVersion:number = quizInfo.lastVersion;

          /* Se busca si el usuario tiene una entrada en la base de datos con cada Quiz */
          this.db.object('/userPoints/'+userId+'/'+quizInfo.name).snapshotChanges().take(1)
            .subscribe((obj) => {
              if (obj.hasOwnProperty('$value') && !obj['$value']) {
                /* El usuario tiene entrada asociada al quiz. Se pasa a comprobar las versiones del mismo que le faltan. 
                 * Y se agregan entradas a la versiiones que le faltan.
                 */
                let userLastQuizVersion:number = items[0].lastVersion;

                for (let i = userLastQuizVersion; i < quizVersion; i++){
                  this.db.list('/userPoints/'+userId+'/'+quizInfo.name).set('/v'+(i+1),{
                    puntuation: 0
                  });
                }             
             } else {
               /* El usuario no tiene entrada asociada al quiz. Se crean la entradas de las versiones del Quiz que le faltan. */
                this.db.list('/userPoints/'+userId).set(quizInfo.name, {
                  lastVersion: quizVersion,
                  userActualVersion: 0
                });
                
                /* Cada versión del Quiz se inicializa con puntuación igual a 0 */
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

