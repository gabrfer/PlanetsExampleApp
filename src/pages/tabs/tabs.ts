import { Component } from '@angular/core';

import { QuizTopUsersPage } from '../quiz-top-users/quiz-top-users';
import { QuizYesnoPage } from '../quiz-yesno/quiz-yesno';
import { UserInfoPage } from '../user-info/user-info';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UserInfoPage;
  tab2Root = QuizYesnoPage;
  tab3Root = QuizTopUsersPage;

  constructor() {

  }
}
