import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataProvider } from '../../providers/data/data';

@Injectable()
export class AuthProvider{
    constructor(private afAuth: AngularFireAuth, public dataProvider: DataProvider){
    }

    signIn(username: string, password: string){
        return this.afAuth.auth.signInWithEmailAndPassword(username,password);
    }

    signUp(username: string, password: string){
        let signupUser = this.afAuth.auth.createUserWithEmailAndPassword(username, password);
        this.getCurrentUser().subscribe(authState => {
            this.dataProvider.createUserQuizInfo(authState.uid, username, true);
          });
        
        return signupUser;
    }

    getCurrentUser(){
        return this.afAuth.authState;
    }

    logOut() {
        this.afAuth.auth.signOut();
    }
}