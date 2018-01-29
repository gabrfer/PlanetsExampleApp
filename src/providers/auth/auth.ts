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

    signUp(displayname: string, username: string, password: string){

        const createUserData = (uid, displayname) => this.dataProvider.createUserQuizInfo(uid, displayname, true);

        let signupUser = this.afAuth.auth.createUserWithEmailAndPassword(username, password)
        .then(function(user) {
            createUserData(user.uid, displayname);
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