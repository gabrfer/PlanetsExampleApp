import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from '@angular/http';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FlashCardComponent } from '../components/flash-card/flash-card';
import { ExpandableComponent } from '../components/expandable/expandable';
import { DataProvider } from '../providers/data/data';
import { QuizPage } from '../pages/quiz/quiz';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { MenuPage } from '../pages/menu/menu';
import { PlanetsPage } from '../pages/planets/planets';
import { MenuProvider } from '../providers/menu/menu';
import { QuizYesnoPage } from '../pages/quiz-yesno/quiz-yesno';
import { QuizPointsProvider } from '../providers/quiz-points/quiz-points';
import { StarsPage } from '../pages/stars/stars';

export const firebaseConfig = {
  apiKey: "AIzaSyClU8HlHob8iRg5FDNHleDm-0HqsYj3Mtw",
  authDomain: "planetsexample.firebaseapp.com",
  databaseURL: "https://planetsexample.firebaseio.com",
  projectId: "planetsexample",
  storageBucket: "planetsexample.appspot.com",
  messagingSenderId: "167838449590"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    QuizPage,
    QuizYesnoPage,
    HomePage,
    MenuPage,
    TabsPage,
    SignupPage,
    PlanetsPage,
    StarsPage,
    FlashCardComponent,
    ExpandableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    QuizPage,
    QuizYesnoPage,
    TabsPage,
    SignupPage,
    MenuPage,
    PlanetsPage,
    StarsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    AuthProvider,
    MenuProvider,
    QuizPointsProvider
  ]
})
export class AppModule {}
