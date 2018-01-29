import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';

@Injectable()
export class QuizPointsProvider {

  constructor(private storage: Storage, private db: AngularFireDatabase, private localStorageProvider: LocalStorageProvider, 
              private authProvider: AuthProvider) {

  }

  fetchPoints(): AngularFireList<any[]>{
    return this.db.list('/userPoints');
  }

  getAllUserPoints(uid){
    this.db.list('/userPoints/'+uid).snapshotChanges().map(actions => {
      return actions.map(action => ({key: action.payload.key, ...action.payload.val()}));
    }).subscribe(items => {
      this.localStorageProvider.setObject("userPoints", items);
    });
  }

  addPoints(puntuation, quizId) {
    
    this.authProvider.getCurrentUser().subscribe(authState => {
      this.db.list('/userPoints/'+authState.uid+"/quiz1").push({
        idQuiz: quizId,
        points: puntuation
      })
    });
  }    

  removePoints(puntuation, userId) {
    this.db.object('/userPoints/'+userId+'/'+puntuation.key).remove()
    .then(x => console.log("SUCCESS"))
    .catch(error => {
      alert("Could not delete note.");
      console.log("ERROR", error)
    });
  }   

  editPoints(puntuation, quizCode, newVersion) {
    this.authProvider.getCurrentUser().subscribe(authState => {

      this.db.object('/userPoints/'+authState.uid+'/'+quizCode+'/userActualVersion').update({
        newVersion
      });

      /* this.db.list('/userPoints/'+authState.uid+'/'+quizCode).set("userActualVersion",{
        newVersion
      }); */

      this.db.list('/userPoints/'+authState.uid+"/"+quizCode).set("v"+newVersion,{
        puntuation
      });
    });
  }

}
