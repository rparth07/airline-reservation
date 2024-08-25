import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({ selector: 'input' })
export class DisableAutoComplete implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'autocomplete',
      'none'
    );
  }
}
