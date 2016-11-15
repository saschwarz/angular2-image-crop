import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  // attribute selector not element selector otherwise invalid SVG is generated
  selector: '[rotator]',
  templateUrl: './rotator.component.html',
  styleUrls: ['./rotator.component.css']
})
export class RotatorComponent {
  @Input() rotation;
  @Output() rotationChange = new EventEmitter<number>();

  private startRotation = 0;
  private startY = 0;

  protected onPanRotateStart(event: any): void {
    // pan up/down on compass element rotates
    event.preventDefault();
    this.startRotation = this.rotation;
    this.startY = event.deltaY;
  }

  protected onPanRotate(event: any): void {
    // pan up/down on compass element outputs change in rotation
    event.preventDefault(); // don't drag image
    // heuristic: a change of 4 pixels per degree of rotation.
    this.rotationChange.emit(Math.floor(this.startRotation + (event.deltaY - this.startY) / 4) % 360);
  }

  protected onRotateBy(event: any, degrees: number): void {
    // don't want select action on mousedown/double click
    event.preventDefault();
    this.rotationChange.emit(Math.floor(this.rotation + degrees) % 360);
  }

  protected preventDefault(event: any): void {
    // required on <image> tags to stop browser standard drag behavior
    event.preventDefault();
  }
}
