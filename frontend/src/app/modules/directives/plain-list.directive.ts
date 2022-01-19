import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPlainList]'
})
export class PlainListDirective {
  constructor(private el: ElementRef) {
    el.nativeElement.style.listStyleType = 'none';
    el.nativeElement.style.padding = '0';
  }
}
