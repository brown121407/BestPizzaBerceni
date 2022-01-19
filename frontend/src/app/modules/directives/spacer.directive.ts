import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSpacer]'
})
export class SpacerDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.flexGrow = 99;
  }
}
