import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
 
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
 
    items: any = [];
    itemExpandHeight: number = 100;
 
    constructor(public navCtrl: NavController) {
 
        this.items = [
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false},
            {expanded: false}
        ];
 
    }
 
    expandItem(item){
 
        this.items.map((listItem) => {
 
            if(item == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
 
            return listItem;
 
        });
 
    }
 
}