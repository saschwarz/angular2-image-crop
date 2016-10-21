import { Component, Input, OnInit } from '@angular/core';
import { Image, Mask } from '../models';


/**
 * Display only cropped area of image.
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
