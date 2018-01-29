import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  username = '';
  password = '';
  displayname = '';

  constructor(private authService: AuthProvider, public navCtrl: NavController, 
              private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  onSignUp() {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
      
    this.authService.signUp(this.displayname, this.username, this.password)
      .then(
        data => {
          loading.dismiss()
          this.navCtrl.setRoot(HomePage);
        }
      ) // successfully create new user
      .catch(
        error => {
          loading.dismiss();
          // display error in a alert
          const alert = this.alertCtrl.create({
                        title: 'Signup failed',
                        message: error.message,
                        buttons: ['Ok']
                        });
          alert.present();
        } // potential errors
      ); // result is a promise
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
