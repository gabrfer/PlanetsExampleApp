import { NgModule } from '@angular/core';
import { FlashCardComponent } from './flash-card/flash-card';
import { ExpandableComponent } from './expandable/expandable';
import { ProgressBarComponent } from './progress-bar/progress-bar';

@NgModule({
	declarations: [FlashCardComponent,
    ExpandableComponent,
    ProgressBarComponent],
	imports: [],
	exports: [FlashCardComponent,
    ExpandableComponent,
    ProgressBarComponent]
})
export class ComponentsModule {}
