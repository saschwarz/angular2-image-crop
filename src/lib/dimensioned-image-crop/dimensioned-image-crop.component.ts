import { AfterViewChecked, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { DimensionedImage } from '../models';
import { ImageCropComponent } from '../image-crop/image-crop.component';

/**
 * The displayed size of the component is responsive.
 */
@Component({
  selector: 'dimensioned-image-crop',
  templateUrl: './dimensioned-image-crop.component.html',
  styleUrls: ['./dimensioned-image-crop.component.css']
})
export class DimensionedImageCropComponent implements AfterViewChecked {
  // Set the size of the mask in units instead of in pixels.
  //
  @Input() mask: DimensionedImage;
  @Input() image: DimensionedImage;
  @ViewChild('display') display: ElementRef;
  private viewHeight: number = 0;

  public ngAfterViewChecked(): void {
    if (this.viewHeight !== this.display.nativeElement.clientHeight - 10) {
      // don't take full height or end up in endless loop as parent container
      // resizes and this is called again and again.
      setTimeout(() => this.viewHeight = this.display.nativeElement.clientHeight - 10, 0);
    }
  }

  @HostListener('keyup', ['$event'])
  protected onKey(event: KeyboardEvent): void {
      // only exercised when the element has focus
      event.stopPropagation();
      event.preventDefault();
      let delta = event.shiftKey ? 10 : 1;
      switch (event.code) {
        case 'ArrowLeft':
          this.mask.dimensions.x -= delta;
          break;
        case 'ArrowRight':
          this.mask.dimensions.x += delta;
          break;
        case 'ArrowDown':
          this.mask.dimensions.y += delta;
          break;
        case 'ArrowUp':
          this.mask.dimensions.y -= delta;
          break;
        case 'Equal':
          this.image.image.rotation += delta;
          break;
        case 'Minus':
          this.image.image.rotation -= delta;
          break;
      }
  }

  protected onPan(event: any): void {
    this.mask.dimensions.x = event.x;
    this.mask.dimensions.y = event.y;
  }

  protected rotateTo(degrees: number): void {
    this.image.image.rotation = Math.floor(degrees) % 360;
  }
}
