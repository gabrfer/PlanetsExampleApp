import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { QuizPointsProvider } from '../../providers/quiz-points/quiz-points';

/**
 * Generated class for the QuizUserHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  displayname;
  username;
  password;
  passwordConfirm;
  Picture;
  base64Image;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cameraPlugin: Camera, public quizPointsProvider: QuizPointsProvider) {
    this.base64Image = "./assets/imgs/user_m.png";

    this.displayname = "Fernando";
    this.username = "Fernando Gabriel";
    this.password = "password";
    this.passwordConfirm = "password";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
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

  updateUser(){
    this.quizPointsProvider.updateUserQuizInfo(this.displayname, this.base64Image);
  }

}
