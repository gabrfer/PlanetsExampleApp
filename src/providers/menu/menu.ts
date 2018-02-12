import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { Component } from '@angular/compiler/src/core';
import { Page } from 'ionic-angular/navigation/nav-util';
import { QuizTopUsersPage } from '../../pages/quiz-top-users/quiz-top-users';
import { UserInfoPage } from '../../pages/user-info/user-info';
import { PlanetsPage } from '../../pages/planets/planets';
import { QuizPage } from '../../pages/quiz/quiz';
import { LoginPage } from '../../pages/login/login';
import { SignupPage } from '../../pages/signup/signup';
import { QuizYesnoPage } from '../../pages/quiz-yesno/quiz-yesno';
import { StarsPage } from '../../pages/stars/stars';
import { TabsPage } from '../../pages/tabs/tabs';
import { AstronomyPage } from '../../pages/astronomy/astronomy';

/*
  Generated class for the MenuServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MenuProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MenuProvider Provider');
  }

  getMenus(){
    return this.http.get('assets/data/menus.json')
     .map((response:Response)=>response);
  }

  getNotLazyComponent(page: string){
    let pageObject: Page = HomePage

    switch(page) {
      case "HomePage": {
        pageObject = HomePage;
        break;
      }
      case "PlanetsPage": {
        pageObject = PlanetsPage;
        break;
      }
      case "StarsPage": {
        pageObject = StarsPage;
        break;
      }
      case "QuizPage": {
        pageObject = QuizPage;
        break;
      }
      case "QuizYesnoPage": {
        pageObject = QuizYesnoPage;
        break;
      }
      case "TabsPage": {
        pageObject = TabsPage;
        break;
      }
      case "QuizTopUsersPage": {
        pageObject = QuizTopUsersPage;
        break;
      }
      case "UserInfoPage": {
        pageObject = UserInfoPage;
        break;
      }
      case "LoginPage": {
        pageObject = LoginPage;
        break;
      }
      case "SignupPage": {
        pageObject = SignupPage;
        break;
      }
      case "AstronomyPage": {
        pageObject = AstronomyPage;
        break;
      }
      default: {
        pageObject = HomePage;
        break;
      }
    }

    return pageObject;
  }

}
