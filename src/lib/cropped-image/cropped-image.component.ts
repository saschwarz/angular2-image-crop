import { Component, Input } from '@angular/core';
import { CroppedImage } from '../models';


/**
 * Display image cropped to the size of the mask.
 */
@Component({
  selector: 'cropped-image',
  templateUrl: './cropped-image.component.html',
  styleUrls: ['./cropped-image.component.css']
})
export class CroppedImageComponent {
  @Input() cropped: CroppedImage;
}
