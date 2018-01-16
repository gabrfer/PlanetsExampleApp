import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username = '';
  password = '';

  constructor(public navCtrl: NavController, private authService: AuthProvider, 
              private loadingCtrl: LoadingController, private alertCrl: AlertController) {
  
  }

  signIn(){
    
    const loading = this.loadingCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();

    const alert = (errorMessage) => this.alertCrl.create({
      title: 'Signin failed.',
      message: errorMessage,
      buttons: ['Ok']
    });

    this.authService.signIn(this.username, this.password)
    .then(authState => {
      loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    })
    .catch(function(error){
      loading.dismiss();
      /*const alert = this.alertCtrl.create({
        title: 'Signin failed.',
        message: error.message,
        buttons:['Ok']
        });
        alert.present();*/
      alert(error.message).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signUp(){
    this.navCtrl.setRoot(SignupPage);
  }

}
