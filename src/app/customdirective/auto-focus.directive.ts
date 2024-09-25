import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';

@Directive({
  selector: '[auto-Focus]',
  standalone: true
})
export class AutoFocusDirective {
  private elementRef:ElementRef;

  constructor(private element_Ref: ElementRef) {
    this.elementRef=element_Ref;
   }

  ngOnInit(): void {
    this.elementRef.nativeElement.focus();
  }
  

}
