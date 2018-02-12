import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AstronomyPage } from './astronomy';

@NgModule({
  declarations: [
    AstronomyPage,
  ],
  imports: [
    IonicPageModule.forChild(AstronomyPage),
  ],
})
export class AstronomyPageModule {}
