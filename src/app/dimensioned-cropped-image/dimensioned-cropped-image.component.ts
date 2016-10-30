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
}
