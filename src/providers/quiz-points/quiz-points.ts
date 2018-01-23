import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';

@Injectable()
export class QuizPointsProvider {

  constructor(private storage: Storage, private db: AngularFireDatabase, private authProvider: AuthProvider) {

  }

  fetchPoints(userId): AngularFireList<any[]>{
    return this.db.list('/userPoints/'+userId);
  }

  addPoints(puntuation, quizId) {
    
    this.authProvider.getCurrentUser().subscribe(authState => {

      this.db.list('/userPoints/'+authState.uid+"/quiz1").push({
        idQuiz: quizId,
        points: puntuation
      })
    });

   /*this.db.list('/userPoints/'+"Ldn7lVujDFaFouGNbw0ieVBbK6r2"+"/quiz1").push({
      idQuiz: puntuation.idQuiz,
      points: puntuation.points
    }) */
    
    /* this.db.list('/userPoints/'+userId).push({
      idQuiz: puntuation.idQuiz,
      points: puntuation.points
    }) */
  }    

  removePoints(puntuation, userId) {
    this.db.object('/userPoints/'+userId+'/'+puntuation.key).remove()
    .then(x => console.log("SUCCESS"))
    .catch(error => {
      alert("Could not delete note.");
      console.log("ERROR", error)
    });
  }   

  editPoints(puntuation, quizCode) {
    this.authProvider.getCurrentUser().subscribe(authState => {

      this.db.object('/userPoints/'+authState.uid+"/"+quizCode).update({
        puntuation
      })
    });
  }

}
