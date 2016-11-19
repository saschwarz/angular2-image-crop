import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DimensionedImage } from '../models';
import { ImageCropComponent } from '../image-crop/image-crop.component';

/**
 * Given a display width/height in pixels the mask and image are
 * displayed at the same scale. The displayed size of the component
 * is responsive or can fixed by specified by suplying width/height
 * attributes and the displayed size of the mask/image are then
 * calculated to match.
 */
@Component({
  selector: 'dimensioned-image-crop',
  templateUrl: './dimensioned-image-crop.component.html',
  styleUrls: ['./dimensioned-image-crop.component.css'],
  entryComponents: [ImageCropComponent]
})
export class DimensionedImageCropComponent implements AfterViewInit {
  // Set the size of the mask in units instead of in pixels.
  //
  @Input() mask: DimensionedImage;
  @Input() image: DimensionedImage;
  /**
   * Optional width of component.
   */
  @Input() width: number;
  /**
   * Optional height of the component.
   */
  @Input() height: number;
  /**
   * Set width/height to mask's width/height. Otherwise
   * sets width/height to image's width/height.
   */
  @Input() useMask: boolean = false;

  @ViewChild('wrapper') private wrapper: ElementRef;

  public ngAfterViewInit(): void {
    /* Scale image/mask */
    console.log(this.wrapper);
    let bb = this.wrapper.nativeElement.getBoundingClientRect();
  }
}
