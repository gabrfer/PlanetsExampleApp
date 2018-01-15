import { Component } from '@angular/core';

import { QuizTopUsersPage } from '../quiz-top-users/quiz-top-users';
import { QuizUserHistoryPage } from '../quiz-user-history/quiz-user-history';
import { QuizPage } from '../quiz/quiz';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = QuizPage;
  tab2Root = QuizUserHistoryPage;
  tab3Root = QuizTopUsersPage;

  constructor() {

  }
}
