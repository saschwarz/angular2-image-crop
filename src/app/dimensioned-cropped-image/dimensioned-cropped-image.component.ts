import { Component, OnInit } from '@angular/core';

/**
 * Display image cropped to the size of the mask.
 * Both the mask and image are displayed at the same
 * scale.
 */
@Component({
  selector: 'app-dimensioned-cropped-image',
  templateUrl: './dimensioned-cropped-image.component.html',
  styleUrls: ['./dimensioned-cropped-image.component.css']
})
export class DimensionedCroppedImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
