import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  items: any = [];
    itemExpandHeight: number = 100;
 
    constructor(public navCtrl: NavController) {
 
        this.items = [
            {
                img: "assets/imgs/mercury-surface.jpg", 
                name: "Mercurio", 
                radius: "2.440 km",
                radiusRelativeEarth: "38%",
                sizeRelativeEarthText: "Menos de la mitad que la Tierra",
                numSatellites: "0",
                expanded: false
            },
            {
                img: "assets/imgs/venus-surface.jpg", 
                name: "Venus", 
                radius: "6.052 km",
                radiusRelativeEarth: "95%",
                sizeRelativeEarthText: "Solo un poco más pequeño que la Tierra",
                numSatellites: "0",
                expanded: false
            },
            {
                img: "assets/imgs/earth-surface.jpg", 
                name: "Tierra", 
                radius: "6.371 km",
                radiusRelativeEarth: "100%",
                sizeRelativeEarthText: "Igual tamaño que la Tierra",
                numSatellites: "1",
                expanded: false
            },
            {
                img: "assets/imgs/mars-surface.jpg", 
                name: "Mars", 
                radius: "3.390 km",
                radiusRelativeEarth: "53%",
                sizeRelativeEarthText: "La mitad que la tierra",
                numSatellites: "2",
                expanded: false
            },
            {
                img: "assets/imgs/jupiter-surface.jpg", 
                name: "Jupiter", 
                radius: "69.911 km",
                radiusRelativeEarth: "1120%",
                sizeRelativeEarthText: "1100 veces más grande que la Tierra",
                numSatellites: "69 (conocidos)",
                expanded: false
            },
            {
                img: "assets/imgs/saturn-surface.png", 
                name: "Saturno", 
                radius: "58.232 km",
                radiusRelativeEarth: "995%",
                sizeRelativeEarthText: "1000 veces más grande que la Tierra",
                numSatellites: "200 (observados)",
                expanded: false
            },
            {
                img: "assets/imgs/uranus-surface.jpg", 
                name: "Urano", 
                radius: "25.362 km",
                radiusRelativeEarth: "400%",
                sizeRelativeEarthText: "400 veces más grande que la Tierra",
                numSatellites: "27 (conocidos)",
                expanded: false
            },
            {
                img: "assets/imgs/neptune-surface.jpg", 
                name: "Neptuno", 
                radius: "24.622 km",
                radiusRelativeEarth: "388%",
                sizeRelativeEarthText: "388 veces más grande que la Tierra",
                numSatellites: "14 conocidos",
                expanded: false
            }/* ,
            {
                img: "assets/imgs/pluto-surface.jpg", 
                name: "Plutón", 
                radius: "1.185 km",
                radiusRelativeEarth: "19%",
                sizeRelativeEarthText: "5 veces más pequeño que la Tierra",
                numSatellites: "5",
                expanded: false
            } */
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
