import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollSticky]'
})
export class ScrollStickyDirective {
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const scrollPosition = window.scrollY;
    const element = this.el.nativeElement;

    if (scrollPosition > 300) {
      this.renderer.addClass(element, 'shadow-sm');
      this.renderer.setStyle(element, 'top', '0px');
    } else {
      this.renderer.removeClass(element, 'shadow-sm');
      this.renderer.setStyle(element, 'top', '-100px');
    }
  }
  

}
