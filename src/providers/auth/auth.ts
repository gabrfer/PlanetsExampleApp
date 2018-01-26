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

        const createUserData = (uid, username) => this.dataProvider.createUserQuizInfo(uid, username, true);

        let signupUser = this.afAuth.auth.createUserWithEmailAndPassword(username, password)
        .then(function(user) {
            createUserData(user.uid, username);
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