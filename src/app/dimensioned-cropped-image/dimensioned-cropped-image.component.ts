import { Component, Input, OnInit } from '@angular/core';
import { DimensionedImage } from '../models';

/**
 * Display image cropped to the size of the mask.
 * Both the mask and image are displayed at the same
 * scale.
 */
@Component({
  selector: 'dimensioned-cropped-image',
  templateUrl: './dimensioned-cropped-image.component.html',
  styleUrls: ['./dimensioned-cropped-image.component.css']
})
export class DimensionedCroppedImageComponent implements OnInit {
  /**
   * mask.width and mask.height are in pixels and are the size of the
   * cropped area/size of the component.
   */
  @Input() mask: DimensionedImage;
  @Input() image: DimensionedImage;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Image width in pixels scaled to the size of the mask.
   */
  get scaledWidth(): number {
    return this.image.image.width;
  }

   /**
   * Image height in pixels scaled to the size of the mask.
   */
  get scaledHeight(): number {
    return this.image.image.height;
  }
}
