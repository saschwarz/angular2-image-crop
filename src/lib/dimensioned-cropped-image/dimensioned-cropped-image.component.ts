import { Component, Input } from '@angular/core';
import { DimensionedCroppedImage } from '../models';

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
  @Input() cropped: DimensionedCroppedImage;

  // Need to get location relative to this element
  // but this element only passes along the location to it's child
  // CrossHairComponent for display it's never used in this class.
  private currentX: number = 0;
  private currentY: number = 0;

  protected showLocation(event: any): void {
    // this is location relative to mask origin but NOT offset
    // by mask.dimensions.[x|y] since we display cursor
    // relative to origin.
    this.currentX = event.x;
    this.currentY = event.y;
  }
}
