import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { PlanetsPage } from '../pages/planets/planets';
import { QuizPage } from '../pages/quiz/quiz';
import { AuthProvider } from '../providers/auth/auth';

import { MenuProvider } from '../providers/menu/menu';
import { DataProvider } from '../providers/data/data';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  //pages: Array<{title: string, component: any, icon: string}>;
  pages:any;
  pages2: any;

  showLevel1 = null;
  showLevel2 = null;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, 
              private authProvider: AuthProvider, private menuProvider: MenuProvider) {
    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    
    // used for an example of ngFor and navigation
    /* this.pages = [
      { title: 'Home', component: HomePage, icon: "home" },
      { title: 'Planets', component: PlanetsPage, icon: "person" },
      { title: 'Quiz', component: QuizPage, icon: "cash" },
    ]; */
    this.menuProvider.getMenus()
    .subscribe((response)=> {
        this.pages = response;
        console.log(this.pages);
    });
  

    this.authProvider.getCurrentUser().subscribe(authState => {
      if (authState) {
        this.rootPage = HomePage;
        console.log("logged in as" + authState.uid);
      }
      else {
        this.rootPage = 'LoginPage';                  
      }
    })
  }

    
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  toggleLevel1(idx) {
    if (this.isLevel1Shown(idx)) {
      this.showLevel1 = null;
    } else {
      this.showLevel1 = idx;
    }
  };
  
  toggleLevel2(idx) {
    if (this.isLevel2Shown(idx)) {
      this.showLevel1 = null;
      this.showLevel2 = null;
    } else {
      this.showLevel1 = idx;
      this.showLevel2 = idx;
    }
  };

  isLevel1Shown(idx) {
    return this.showLevel1 === idx;
  };
  
  isLevel2Shown(idx) {
    return this.showLevel2 === idx;
  };
}
