import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[dragmove]'
})
export class DragMoveDirective {
  @Input() x;
  @Input() y;
  @Output() locationChange = new EventEmitter<any>();

  private startX = 0;
  private startY = 0;

  @HostListener('panstart', ['$event']) protected onPanStart(event) {
    event.preventDefault();
    // hammerjs events give deltas since start of gesture so
    // capture the initial values so I can apply the deltas for
    // each event and update the view.
    this.startX = this.x;
    this.startY = this.y;
  }

  @HostListener('panmove', ['$event']) protected onPanMove(event) {
    event.preventDefault();
    this.x = this.startX + event.deltaX;
    this.y = this.startY + event.deltaY;
    this.locationChange.emit({x: this.x, y: this.y});
  }
}
