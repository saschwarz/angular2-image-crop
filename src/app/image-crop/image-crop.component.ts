import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';


@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent implements OnInit {
  @Input() imageURL: string;
  @Input() imageWidth: number;
  @Input() imageHeight: number;
  @Input() maskWidth: number;
  @Input() maskHeight: number;

  private x: number = 0;
  private y: number = 0;
  private rotation: number = 0;
  private transform: SafeStyle;
  private image: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {
  }

  public getMaskStyles() {
    return {
      'height': this.maskHeight + 'px',
      'width': this.maskWidth + 'px'
    };
  }

  public getImageStyles() {
    this.transform = this.sanitizer.bypassSecurityTrustStyle('rotate(' + this.rotation + 'deg)');
    return {
      'background-position': this.x + 'px ' + this.y + 'px',
      'background-image': this.image,
      'height': this.imageHeight + 'px',
      'width': this.imageWidth + 'px'
    };
  }

  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustStyle('url(' + this.imageURL + ')');
  }

}
