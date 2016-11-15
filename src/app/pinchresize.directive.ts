import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[pinchresize]'
})
export class PinchResizeDirective {
  @Input('attr.width') width: number;
  @Input('attr.height') height: number;
  @Output() sizeChange = new EventEmitter<any>();

  private startWidth = 0;
  private startHeight = 0;

  @HostListener('pinchstart', ['$event']) protected onPinchStart(event) {
    event.preventDefault();
    // hammerjs events give deltas since start of gesture so
    // capture the initial values so I can apply the deltas for
    // each event and update the view.
    this.startWidth = this.width;
    this.startHeight = this.height;
  }

  @HostListener('pinchmove', ['$event']) protected onPinchMove(event) {
    event.preventDefault();
    this.width = Math.floor(this.startWidth * event.scale);
    this.height = Math.floor(this.startHeight * event.scale);
    this.sizeChange.emit({width: this.width, height: this.height});
  }
}
