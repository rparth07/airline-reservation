import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  Renderer2,
} from '@angular/core';
@Directive({ selector: '[onClickOutside]' })
export class CloseOnOutsideClick {
  @Output()
  onClickOutside = new EventEmitter<MouseEvent>();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!this.elementRef.nativeElement.contains(targetElement)) {
      this.onClickOutside.emit(event);
    }
  }
}
