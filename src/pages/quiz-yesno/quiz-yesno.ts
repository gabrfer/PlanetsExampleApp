import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

/**
 * Generated class for the QuizYesnoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quiz-yesno',
  templateUrl: 'quiz-yesno.html',
})
export class QuizYesnoPage {

  @ViewChild('slides') slides: any;

  hasAnswered: boolean = false;
  score: number = 0;

  slideOptions: any;
  questions: any;

  private answerOriginalColor: string = 'answer';
  private answerSelectedColor: string = 'answerSelected';
  private answerCorrectColor: string = 'answerCorrect';
  private answerIncorrectColor: string = 'answerIncorrect';

  constructor(public navCtrl: NavController, public dataService: DataProvider) {
  }

  toggleAnswerColor() {
    this.answerOriginalColor = 'answerSelected';
  }

  ionViewDidLoad() {
    
    this.slides.lockSwipes(true);

    this.dataService.loadYesNo().then(data => {

      let i = 0;

      data.questions.map((question) => {

        let originalOrder = question.answers;
        question.answers = this.randomizeAnswers(originalOrder);
        return question;
      });

      this.questions = data.questions;
    })
  }

  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  
  selectAnswer(answer, question){

    this.hasAnswered = true;
    answer.selected = true;
    question.flashCardFlipped = true;

    if(answer.correct){
      this.score++;
    }

    answer.color = (answer.correct) ? this.answerCorrectColor : this.answerIncorrectColor;

    setTimeout(() => {
      this.hasAnswered = false;
      this.nextSlide();
      answer.selected = false;
      question.flashCardFlipped = false;
    }, 3000);

  }

  randomizeAnswers(rawAnswers: any[]): any[] {

    for (let i = rawAnswers.length  - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = rawAnswers[i];
      rawAnswers[i] = rawAnswers[j];
      rawAnswers[j] = temp;
    }

    return rawAnswers;
  }

  restartQuiz() {
    this.score = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 1000);
    this.slides.lockSwipes(true);
  }

}
