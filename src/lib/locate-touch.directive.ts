import { Directive, ElementRef, EventEmitter, HostListener, AfterContentInit, Output } from '@angular/core';

// Use Hammer.js pan data to locate the pointer and return the relative x-y coordinates in
// pixels from the top/left (default 0,0 location) of the SVG element in it's coordinate system.
@Directive({
  selector: '[locate-touch]'
})
export class LocateTouchDirective implements AfterContentInit {

  @Output() locationChange = new EventEmitter<any>();
  private pt;

  @HostListener('panmove', ['$event']) protected onPanMove(event) {
    this.handler(event);
  }

  @HostListener('tap', ['$event']) protected onTap(event) {
    this.handler(event);
  }

  private handler(event) {
    event.preventDefault();
    if (event.srcEvent.clientX) {
      // mouse event
      this.pt.x = event.srcEvent.clientX;
      this.pt.y = event.srcEvent.clientY;
    } else {
      // touch event
      this.pt.x = event.srcEvent.targetTouches[0].clientX;
      this.pt.y = event.srcEvent.targetTouches[0].clientY;
    }
    let location = this.pt.matrixTransform(this.elementRef.nativeElement.getScreenCTM().inverse());
    this.locationChange.emit({x: location.x, y: location.y});
  }

  constructor(private elementRef: ElementRef) {
  }

  ngAfterContentInit(): void {
    // TODO search up for svg element instead of assuming this is an immediate child element of <svg>.
    // http://stackoverflow.com/a/21346747/457935
    this.pt = this.elementRef.nativeElement.parentElement.createSVGPoint();
  }

}
