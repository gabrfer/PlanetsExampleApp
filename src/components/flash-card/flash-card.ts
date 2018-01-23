import { Component, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'flash-card',
  templateUrl: 'flash-card.html'
})
export class FlashCardComponent {
  @ViewChild('fcContainer') fcContainer;
  @ViewChild('front') fcFront;
  @ViewChild('back') fcBack;

  @Input('isFlipped') flipCard: boolean;

  constructor(private flashCard: ElementRef) {
  }
  ngAfterViewChecked(){
    //equalizing the height of child divs with the largest div
    let frontH = this.fcFront.nativeElement.querySelector('.flash-card-front').offsetHeight + 40;
    let backH = this.fcBack.nativeElement.querySelector('.flash-card-back').offsetHeight + 40;
    let h = ((frontH > backH)? frontH:backH) + 'px';
/*     this.fcContainer.nativeElement.style.height = h;
    this.fcBack.nativeElement.style.height = h;
    this.fcFront.nativeElement.style.height = h; */
  }
 
}