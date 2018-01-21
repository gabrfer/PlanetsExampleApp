import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the StarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stars',
  templateUrl: 'stars.html',
})
export class StarsPage {

  items: any = [];
    itemExpandHeight: number = 100;
 
    constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
 
        this.items = [
            {
                img: "assets/imgs/sirio.jpg", 
                name: "Sirio", 
                radius: "2.440 km",
                radiusRelativeEarth: "38%",
                sizeRelativeEarthText: "Menos de la mitad que la Tierra",
                numSatellites: "0",
                alertDescription: "Hola, soy Sirio, la estrella más brillante de todo el universo. " + 
                "Vuestro sol no brilla un cuerno al lado mío. Me verás todas las noches sin apenas esfuerzo " + 
                "porque soy blanca y deslumbrante como ninguna.",
                expanded: false
            },
            {
                img: "assets/imgs/canopus.jpg", 
                name: "Canopus", 
                radius: "6.052 km",
                radiusRelativeEarth: "95%",
                sizeRelativeEarthText: "Solo un poco más pequeño que la Tierra",
                numSatellites: "0",
                alertDescription: "Hola, soy Canopus, la segunda estrella más brillante de tu cielo. " + 
                "Soy blanca y amarilla, pero solo me ven en América. Los europeos no sois dignos de mi belleza.",
                expanded: false
            },
            {
                img: "assets/imgs/alpha_centauri.jpg", 
                name: "Rigil Kentaurus", 
                radius: "6.371 km",
                radiusRelativeEarth: "100%",
                sizeRelativeEarthText: "Igual tamaño que la Tierra",
                numSatellites: "1",
                alertDescription: "Hola, soy Rigil Kentaurus o Alpha Centauri, como quieras llamarme. " + 
                "Soy la tercera más brillante de tu minúsculo cielo, pero tengo tres estrellas en una, " + 
                " ¡chupate esa Sirio!. Además, soy la más cercana a vuestro sistema solar, y los planetas " + 
                " que están alrededor mío podrían tener vida...ahí dejo eso.",
                expanded: false
            },
            {
                img: "assets/imgs/arturo.jpg", 
                name: "Arturo", 
                radius: "3.390 km",
                radiusRelativeEarth: "53%",
                sizeRelativeEarthText: "La mitad que la tierra",
                numSatellites: "2",
                alertDescription: "Hola, soy Arturo, y aunque soy la cuarta más brillante, tengo el título " + 
                " de la más brillante del Hemisferio Norte Celeste, es decir, la reina del norte. Soy naranja, " + 
                " y la que más destaca en primavera",
                expanded: false
            },
            {
                img: "assets/imgs/vega.png", 
                name: "Vega", 
                radius: "69.911 km",
                radiusRelativeEarth: "1120%",
                sizeRelativeEarthText: "1100 veces más grande que la Tierra",
                numSatellites: "69 (conocidos)",
                alertDescription: "Yo me llamo Vega, la quinta más brillante. Aún soy joven, y estoy " + 
                "transformando mi hidrógeno en helio, que es lo que hace la juventud aquí. Y, como dato " + 
                "importante, dentro de muy poquito seré la estrella Polar, Polaris (la actual estrella polar)" + 
                " tiene los días contados HA HA HA (risa de malo de película).",
                expanded: false
            },
            {
                img: "assets/imgs/capella.jpg", 
                name: "Capella", 
                radius: "58.232 km",
                radiusRelativeEarth: "995%",
                sizeRelativeEarthText: "1000 veces más grande que la Tierra",
                numSatellites: "200 (observados)",
                alertDescription: "Hola, soy Capella, la sexta más brillante. A diferencia de la mayoria, " + 
                "estoy compuesta por dos estrellas amarillas, pocas pueden decir eso.",
                expanded: false
            },
            {
                img: "assets/imgs/rigel.jpg", 
                name: "Rigel", 
                radius: "25.362 km",
                radiusRelativeEarth: "400%",
                sizeRelativeEarthText: "400 veces más grande que la Tierra",
                numSatellites: "27 (conocidos)",
                alertDescription: "Yo soy Rigel, la séptima más brillante. También me compongo de varias " + 
                "estrellas, una de ellas una gigante blanca y azul hermosa, superad esto Sirio y compañía...",
                expanded: false
            },
            {
                img: "assets/imgs/procyon.jpg", 
                name: "Procyon", 
                radius: "24.622 km",
                radiusRelativeEarth: "388%",
                sizeRelativeEarthText: "388 veces más grande que la Tierra",
                numSatellites: "14 conocidos",
                alertDescription: "Hola, soy Procyon, formada por tres estrellas, una de ellas gigantesca " + 
                "de color blanco y amarillento. Junto a Betelgeus y Sirio formo el temido triángulo del Invierno. " + 
                "Soy la octava más brillante, me ganan otras 7, pero pertenezco al triángulo mágico del Invierno.",
                expanded: false
            },
            {
                img: "assets/imgs/achernar.jpg", 
                name: "Achernar", 
                radius: "1.185 km",
                radiusRelativeEarth: "19%",
                sizeRelativeEarthText: "5 veces más pequeño que la Tierra",
                numSatellites: "5",
                alertDescription: "Soy Achernar, hermana de Neymar, y la novena más brillante. " + 
                "Mi belleza blanca y azulada no es visible en gran parte de vuestro planeta " + 
                "insignificante, vosotros os lo perdéis.",
                expanded: false
            },
            {
              img: "assets/imgs/betelgeuse.jpg", 
              name: "Betelgeuse", 
              radius: "1.185 km",
              radiusRelativeEarth: "19%",
              sizeRelativeEarthText: "5 veces más pequeño que la Tierra",
              numSatellites: "5",
              alertDescription: "Hola, soy Betelgeuse, la décima más brillante, pero a su vez...gigante. " + 
              "Si me pusiera en el lugar de vuestro minúsculo sol, alcanzaría a Marte y a vosotros os " + 
              "derretiría en un abrir y cerrar de ojos. Soy supergigante y roja, y vosotros los humanos, " + 
              "hicistéis una serie de televisión de dibujos en mi honor: Beetlejuice",
              expanded: false
          },
          {
            img: "assets/imgs/polaris.jpg", 
            name: "Polaris", 
            radius: "1.185 km",
            radiusRelativeEarth: "19%",
            sizeRelativeEarthText: "5 veces más pequeño que la Tierra",
            numSatellites: "5",
            alertDescription: "Hola, soy Polaris, más conocida como 'Estrella Polar'. Es decir, que no " + 
            "soy una estrella, soy 'LA ESTRELLA'. Si no es por mí perderíais el norte a cada rato, y " + 
            "vuestros queridos reyes magos no hubieran encontrado Belén, así que, no tendríais regalos " + 
            "por navidad. Se dice que otra estrella arpía quiere quitarme el título de 'Estrella Polar', " + 
            "será por encima de mi cadaver...superficie mejor dicho." ,
            expanded: false
          },
          {
            img: "assets/imgs/aldebaran.jpg", 
            name: "Aldebarán", 
            radius: "1.185 km",
            radiusRelativeEarth: "19%",
            sizeRelativeEarthText: "5 veces más pequeño que la Tierra",
            numSatellites: "5",
            alertDescription: "Soy Aldebarán, una de las más brillantes de vuestro cielo, no estoy entre " + 
            "las 10 primeras, pero me da igual. Soy 40 veces más brillante que vuestro sol y 125 veces más " + 
            "grande. En Star Wars los humanos pusieron mi nombre a un planeta, que fue destruido durante " + 
            "la película, algo que no me gustó nada. Me vengaré...",
            expanded: false
          },
          {
            img: "assets/imgs/altair.jpg", 
            name: "Altair", 
            radius: "1.185 km",
            radiusRelativeEarth: "19%",
            sizeRelativeEarthText: "5 veces más pequeño que la Tierra",
            numSatellites: "5",
            alertDescription: "Yo soy Altair, la duodécima más brillante. Soy 4 veces más grande que " + 
            "vuestro diminuto Sol, y mucho más jóven. Estoy cerca de vuestro planetilla, y mi nombre " + 
            "en vuestro idioma significa 'La voladora'",
            expanded: false
          },
          {
            img: "assets/imgs/antares.jpg", 
            name: "Antares", 
            radius: "1.185 km",
            radiusRelativeEarth: "19%",
            sizeRelativeEarthText: "5 veces más pequeño que la Tierra",
            numSatellites: "5",
            alertDescription: "Yo soy Antares, una de las más grandes, supergigante y roja, 700 veces " + 
            "más grande que el Sol y 10.000 veces más luminosa. Mi nombre significa 'La más bella del cielo'" +
            ", con eso queda dicho todo...",
            expanded: false
          },
          {
            img: "assets/imgs/vy-canis-majoris.jpg", 
            name: "VY Canis Majoris", 
            radius: "1.185 km",
            radiusRelativeEarth: "19%",
            sizeRelativeEarthText: "5 veces más pequeño que la Tierra",
            numSatellites: "5",
            alertDescription: "A ver, estrellas losers que aparecéis por aquí antes que yo, soy la más " + 
            "grande del universo conocido (porque aún habéis conocido muy poco humanos), y además una de " + 
            "las más brillantes. Si ponéis 2.000 soles en linea recta aún seguiría siendo más grande jajaja.",
            expanded: false
          }
        ];
 
    }
 
    expandItem(item){
 
        /* this.items.map((listItem) => {
 
            if(item == listItem){
                listItem.expanded = !listItem.expanded;
            } else {
                listItem.expanded = false;
            }
 
            return listItem;
 
        }); */
 
    }

    showAlert(item) {
        let alert = this.alertCtrl.create({
          title: 'Mensaje de la estrella ' + item.name,
          subTitle: item.alertDescription,
          buttons: ['OK']
        });
        alert.present();
      }
}
