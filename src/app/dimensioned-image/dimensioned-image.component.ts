import { Component, OnInit } from '@angular/core';
import { Image, Mask } from '../models';


@Component({
  selector: 'app-dimensioned-image',
  templateUrl: './dimensioned-image.component.html',
  styleUrls: ['./dimensioned-image.component.css']
})
export class DimensionedImageComponent implements OnInit {
  @Input() mask: Mask;
  @Input() image: Image;

  constructor() { }

  ngOnInit() {
  }

}
