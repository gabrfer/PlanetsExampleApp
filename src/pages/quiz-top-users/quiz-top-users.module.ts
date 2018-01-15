import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizTopUsersPage } from './quiz-top-users';

@NgModule({
  declarations: [
    QuizTopUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(QuizTopUsersPage),
  ],
})
export class QuizTopUsersPageModule {}
