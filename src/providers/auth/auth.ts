import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataProvider } from '../../providers/data/data';

@Injectable()
export class AuthProvider{
    constructor(private afAuth: AngularFireAuth, public dataProvider: DataProvider){
    }

    signIn(username: string, password: string){
        const updateUserData = (uid) => this.dataProvider.createUserQuizInfo(uid, false);

        let signinUser = this.afAuth.auth.signInWithEmailAndPassword(username,password)
        .then(function(user) {
            updateUserData(user.uid);
            return user.uid;
        });

        return signinUser;
    }

    signUp(displayname: string, username: string, password: string, imageData: any){

        const createUserData = (uid, displayname) => this.dataProvider.createUserQuizInfo(uid, true, displayname, imageData);

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