import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { urlToNavGroupStrings } from 'ionic-angular/navigation/url-serializer';

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
  Picture;
  base64Image;

  constructor(private authService: AuthProvider, public navCtrl: NavController, public cameraPlugin: Camera, 
              private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
                this.base64Image = "./assets/imgs/user_m.png";
  }

  takePicture(){

    this.cameraPlugin.getPicture({
      quality : 95,
      destinationType : this.cameraPlugin.DestinationType.DATA_URL,
      sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: this.cameraPlugin.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
       // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      //this.Picture is passing the string to our DB
      this.Picture = imageData;
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });

  }

  onSignUp() {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
      
    this.authService.signUp(this.displayname, this.username, this.password, this.Picture)
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
