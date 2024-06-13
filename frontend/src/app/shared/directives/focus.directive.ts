import {AfterContentInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements AfterContentInit{

  constructor(private element: ElementRef) {
  }

  ngAfterContentInit() {
    this.element.nativeElement.focus();
  }

}
