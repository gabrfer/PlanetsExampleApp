import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizYesnoPage } from './quiz-yesno';

@NgModule({
  declarations: [
    QuizYesnoPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizYesnoPage),
  ],
})
export class QuizYesnoPageModule {}
