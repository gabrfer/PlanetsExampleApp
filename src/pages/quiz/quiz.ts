import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { QuizPointsProvider } from '../../providers/quiz-points/quiz-points';
import { LocalStorageProvider } from '../../providers/local-storage/local-storage';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

  @ViewChild('slides') slides: any;

  selectedColor: String = "danger";

  quizName: String;
  hasAnswered: boolean = false;
  score: number = 0;

  slideOptions: any;
  questions: any;
  questionsKeys: String[];
  answerKeys: String[] = ["answer1", "answer2", "answer3"];
  answerColor = "answer"
  backgroundURL: String;

  userPoints;

  loadProgress: number = 0;
  percentegePerQuestion: number = 0;

  private answerOriginalColor: string = 'answer';
  private answerSelectedColor: string = 'answerSelected';
  private answerCorrectColor: string = 'answerCorrect';
  private answerIncorrectColor: string = 'answerIncorrect';

  puntuationTableColors: String[] = ['answer', 'answer', 'answer', 'answer', 'answer', 'answer'];
  selectedPuntuationItem: number = 0;


  constructor(public navCtrl: NavController, public dataService: DataProvider, private storage: Storage, params: NavParams,
              public quizPointsProvider: QuizPointsProvider, public localStorageProvider: LocalStorageProvider, public alertCtrl: AlertController) {
                this.quizName = params.get('quizName');
  }

  toggleAnswerColor() {
    this.answerOriginalColor = 'answerSelected';
  }

  ionViewDidLoad() {
    
    this.slides.lockSwipes(true);

      this.localStorageProvider.getObject("userPoints").then((data) => {
        this.userPoints = JSON.parse(data).filter(x => x.key == this.quizName)[0];

        this.dataService.getQuizByName(this.quizName, this.userPoints.userActualVersion + 1).snapshotChanges().map(actions => {
          return actions.map(action => (action.payload.val()));
        }).subscribe(items => {
            this.backgroundURL = items[0];
            this.questions = items[1];
            this.questionsKeys = Object.keys(items[1]);
            this.percentegePerQuestion = 100 / this.questionsKeys.length;
          });
      });       
  }

  nextSlide(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
  
  selectAnswer(answer, question, index){

    answer.color = this.answerSelectedColor;
    setTimeout(() => {
      this.hasAnswered = true;
      answer.selected = true;
      question.flashCardFlipped = true;
    }, 1500);

    if(answer.correct){
      this.score += 5;
    }

    if (index == this.questionsKeys.length - 1){

      if (this.score >= 0 && this.score < 10) {
        this.puntuationTableColors[0] = "danger";
        this.selectedPuntuationItem = 0;
      } else if (this.score >= 11 && this.score < 20) {
        this.puntuationTableColors[1] = "danger";
        this.selectedPuntuationItem = 1;
      } else if (this.score >= 20 && this.score < 30) {
        this.puntuationTableColors[2] = "danger";
        this.selectedPuntuationItem = 2;
      } else if (this.score >= 30 && this.score < 40) {
        this.puntuationTableColors[3] = "danger";
        this.selectedPuntuationItem = 3;
      } else if (this.score >= 40 && this.score < 50) {
        this.puntuationTableColors[4] = "danger";
        this.selectedPuntuationItem = 4;
      } else if (this.score == 50) {
        this.puntuationTableColors[5] = "danger";
        this.selectedPuntuationItem = 5;
      }
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

  showAlertPoints(selectedItem) {
    if (selectedItem === this.selectedPuntuationItem) {
      let alert = this.alertCtrl.create({
        title: 'Mensaje del profesor ',
        subTitle: "En privado te puedo decir algo más....no eres más tonto porque no tienes más tiempo",
        buttons: ['OK']
      });
      alert.present();
    }    
  }

  restartQuiz() {

    this.quizPointsProvider.editPoints(this.score, this.userPoints.key, this.userPoints.userActualVersion + 1);

    this.score = 0;
    this.slides.lockSwipes(false);
    this.slides.slideTo(0, 1000);
    this.slides.lockSwipes(true);
  }

}
