import { Component, HostListener, Input } from '@angular/core';

import { Image, Mask } from '../models';


@Component({
  selector: 'image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent {
  @Input() mask: Mask;
  @Input() image: Image;

  @HostListener('keyup', ['$event'])
  protected onKey(event: KeyboardEvent): void {
      // only exercised when the element has focus
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

  protected onPan(event: any): void {
    this.mask.x = event.x;
    this.mask.y = event.y;
  }

  protected rotateTo(degrees: number): void {
    this.image.rotation = Math.floor(degrees) % 360;
  }

  protected onSizeChange(event: any): void {
    this.mask.height = event.height;
    this.mask.width = event.width;
  }
}
