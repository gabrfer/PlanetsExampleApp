import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { QuizPointsProvider } from '../../providers/quiz-points/quiz-points';

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  @ViewChild('slides') slides: any;

  hasAnswered: boolean = false;
  score: number = 0;

  slideOptions: any;
  questions: any;
  quizCode: "";
  loadProgress: number = 0;
  percentegePerQuestion: number = 0;

  private answerOriginalColor: string = 'answer';
  private answerSelectedColor: string = 'answerSelected';
  private answerCorrectColor: string = 'answerCorrect';
  private answerIncorrectColor: string = 'answerIncorrect';

  constructor(public navCtrl: NavController, public dataService: DataProvider, 
              public quizPointsProvider: QuizPointsProvider) {
  }

  toggleAnswerColor() {
    this.answerOriginalColor = 'answerSelected';
  }

  ionViewDidLoad() {
    
    this.slides.lockSwipes(true);

    this.dataService.load().then(data => {

      let i = 0;

      data.questions.map((question) => {

        let originalOrder = question.answers;
        question.answers = this.randomizeAnswers(originalOrder);
        return question;
      });

      this.questions = data.questions;
      this.percentegePerQuestion = Math.round(100 / this.questions.length);
      this.quizCode = data.name;
    })
  }

  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  
  selectAnswer(answer, question){

    answer.color = this.answerSelectedColor;
    setTimeout(() => {
      this.hasAnswered = true;
      answer.selected = true;
      question.flashCardFlipped = true;
    }, 1500);

    if(answer.correct){
      this.score += 5;
    }

    setTimeout(() => {
      this.hasAnswered = false;
      this.nextSlide();
      answer.selected = false;
      question.flashCardFlipped = false;
      this.loadProgress += this.percentegePerQuestion;
    }, 3000);

  }

  randomizeAnswers(rawAnswers: any[]): any[] {

    let arrayLetters: string[] = ["A", "B", "C"];

    for (let i = rawAnswers.length  - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = rawAnswers[i];
      rawAnswers[i] = rawAnswers[j];
      rawAnswers[i].letter = arrayLetters[i];
      rawAnswers[j] = temp;
      rawAnswers[j].letter = arrayLetters[j];
    }

    return rawAnswers;
  }

  restartQuiz() {

    this.quizPointsProvider.editPoints(this.score, this.quizCode);

    this.score = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 1000);
    this.slides.lockSwipes(true);
  }

}
