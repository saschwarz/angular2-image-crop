import { AfterViewChecked, Component, ElementRef, Input, ViewChild } from '@angular/core';
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
    // only set once
    if (!this.viewHeight) {
      setTimeout(() => this.viewHeight = this.display.nativeElement.offsetHeight, 0);
    }
  }
  protected onPan(event: any): void {
    this.mask.dimensions.x = event.x;
    this.mask.dimensions.y = event.y;
  }

  protected rotateTo(degrees: number): void {
    this.image.image.rotation = Math.floor(degrees) % 360;
  }

  protected onSizeChange(event: any): void {
    this.mask.image.height = event.height;
    this.mask.image.width = event.width;
  }
}
