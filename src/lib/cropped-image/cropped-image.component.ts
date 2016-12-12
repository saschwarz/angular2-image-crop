import { Component, Input } from '@angular/core';
import { Image, Mask } from '../models';


/**
 * Display image cropped to the size of the mask.
 */
@Component({
  selector: 'cropped-image',
  templateUrl: './cropped-image.component.html',
  styleUrls: ['./cropped-image.component.css']
})
export class CroppedImageComponent {
  @Input() mask: Mask;
  @Input() image: Image;
}
