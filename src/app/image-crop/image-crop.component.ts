import { Component, ElementRef, HostListener, Input } from '@angular/core';
import 'hammerjs';
import 'hammer-timejs';

import { Image, Mask } from '../models';


@Component({
  selector: 'image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent {
  // pan/rotate event book keeping
  private startX: number;
  private startY: number;
  private startRotation: number = 0;
  private startMaskWidth: number;
  private startMaskHeight: number;

  // @ViewChild('display') display: ElementRef;

  @Input() mask: Mask;
  @Input() image: Image;

  @HostListener('document:keyup', ['$event'])
  protected onKey(event: KeyboardEvent): void {
      if (event.srcElement && event.srcElement.classList.contains('display')) {
        // TODO find a way to only supply key events when display element has focus
        event.stopPropagation();
        event.preventDefault();
        let delta = event.shiftKey ? 10 : 1;
        switch (event.code) {
          case 'ArrowLeft':
            this.mask.x -= delta;
            break;
          case 'ArrowRight':
            this.mask.x += delta;
            break;
          case 'ArrowDown':
            this.mask.y += delta;
            break;
          case 'ArrowUp':
            this.mask.y -= delta;
            break;
          case 'Equal':
            this.image.rotation += delta;
            break;
          case 'Minus':
            this.image.rotation -= delta;
            break;
        }
      }
  }

  protected preventDefault(event: any): void {
    // required on <image> tags to stop browser standard drag behavior
    event.preventDefault();
  }

  protected onGestureStart(event: any): void {
    event.preventDefault();
    // hammerjs events give deltas since start of gesture so
    // capture the initial values so I can apply the deltas for
    // each event and update the view.
    this.startX = this.mask.x;
    this.startY = this.mask.y;
    this.startRotation = Math.floor(parseInt(<string><any>event.rotation, 10) - parseInt(<string><any>this.image.rotation, 10)) % 360;
    this.startMaskHeight = this.mask.height;
    this.startMaskWidth = this.mask.width;
  }

  protected onPan(event: any): void {
    event.preventDefault();
    this.mask.x = this.startX + event.deltaX;
    this.mask.y = this.startY + event.deltaY;
  }

  protected rotateTo(degrees: number): void {
    this.image.rotation = Math.floor(degrees) % 360;
  }

  // used by hammer rotate gesture
  protected onRotate(event: any): void {
    event.preventDefault();
    this.rotateTo(event.rotation - this.startRotation);
  }

  protected onPinch(event: any): void {
    event.preventDefault();
    this.mask.height = Math.floor(this.startMaskHeight * event.scale);
    this.mask.width = Math.floor(this.startMaskWidth * event.scale);
  }
}
