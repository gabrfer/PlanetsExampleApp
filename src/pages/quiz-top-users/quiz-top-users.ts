import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizPointsProvider } from '../../providers/quiz-points/quiz-points';

/**
 * Generated class for the QuizTopUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quiz-top-users',
  templateUrl: 'quiz-top-users.html',
})
export class QuizTopUsersPage {

  userPointsSubscription;
  userPoints: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public quizPointsProvider: QuizPointsProvider) {
  }

  ngOnInit() {
    this.userPointsSubscription = this.quizPointsProvider.fetchPoints().snapshotChanges().map(items => {
      return items.map(item => ({key: item.key, ...item.payload.val()}));
    }).subscribe(items => {
      this.userPoints = items.map(item => ({userName: item.userName, totalPoints: item.quizPlanets.puntuation*2})).sort(function (a, b) {
        return b.totalPoints - a.totalPoints;
      });
    });
  }

  ngOnDestroy() {
    this.userPointsSubscription.unsubscribe();
  }

}
