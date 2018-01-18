import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    userSubscription;
    notesSubscription;
    notes: any[]; 
    userId;
    
    constructor(public navCtrl: NavController, private authService: AuthProvider, db: AngularFireDatabase) {
    }
  
    ngOnInit(){
      this.userSubscription = this.authService.getCurrentUser().subscribe(authState => {
        this.userId = authState.uid;
  
        /* this.notesSubscription = this.noteService.fetchNotes(this.userId).snapshotChanges().map(actions => {
          return actions.map(action => ({key: action.key, ...action.payload.val()}));
        }).subscribe(items => {
            this.notes = items;
          }); */
      })
    }
  
    ngOnDestroy() {
      //this.notesSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
    }
  
    onItemClick(note){
      this.navCtrl.push('DetailPage', {
        noteParam: note,
        userId: this.userId
      });
    }
  
    onAddClick(){
      this.navCtrl.push('DetailPage', {
        userId: this.userId
      });
    }
  
    logOut(){
      this.authService.logOut();
      this.navCtrl.setRoot('LoginPage');
    }

}
