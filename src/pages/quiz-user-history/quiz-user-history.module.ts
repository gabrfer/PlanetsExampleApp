import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizUserHistoryPage } from './quiz-user-history';

@NgModule({
  declarations: [
    QuizUserHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizUserHistoryPage),
  ],
})
export class QuizUserHistoryPageModule {}
