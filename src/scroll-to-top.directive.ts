import { Directive, ElementRef, HostListener } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollToTop]'
})
export class ScrollToTopDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 300) {

      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
    } else {

      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }

  @HostListener('click', ['$event'])
  onBackToTopClick(event: Event) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
