import { Component, Input } from '@angular/core';
import { DimensionedImage } from '../models';

/**
 * Display Image cropped to the size of the Mask.
 * Both the Mask and Image are displayed at the same
 * scale.
 * The Mask is positioned using Dimensions.x and Dimensions.y instead
 * of using pixels.
 * TODO: Image.Dimensions.x/y are not yet factored in.
 */
@Component({
  selector: 'dimensioned-cropped-image',
  templateUrl: './dimensioned-cropped-image.component.html',
  styleUrls: ['./dimensioned-cropped-image.component.css']
})
export class DimensionedCroppedImageComponent {
  /**
   * mask.width and mask.height are in pixels and are the size of the
   * cropped area/size of the component.
   */
  @Input() mask: DimensionedImage;
  @Input() image: DimensionedImage;

  private currentX: number = 0;
  private currentY: number = 0;

  protected showLocation(event: any): void {
    // this is location relative to mask origin but NOT offset
    // by mask.dimensions.[x|y] since we display cursor
    // relative to origin.
    this.currentX = event.x;
    this.currentY = event.y;
  }

  // numeric representation in mask units
  displayX() {
    return (this.currentX - this.mask.dimensions.x).toFixed(1);
  }

  displayY() {
    return (this.currentY - this.mask.dimensions.y).toFixed(1);
  }
}
