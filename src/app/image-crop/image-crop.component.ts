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
  @Input() rotation: number = 0;

  private x: number = 0;
  private y: number = 0;
  // private transform: SafeStyle;
  // private maskTransform: SafeStyle;
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
    // // this.transform = this.sanitizer.bypassSecurityTrustStyle('rotate(' + this.rotation + ' ' + this.imageWidth/2 + ' ' + this.imageHeight/2 + ') translate(' + this.x + 'px, ' + this.y + 'px)');
    // this.maskTransform = this.sanitizer.bypassSecurityTrustStyle('rotate(' + -this.rotation + 'deg) translate(' + this.x + 'px, ' + this.y + 'px)');
    return {
      'height': this.imageHeight + 'px',
      'width': this.imageWidth + 'px'
    };
  }

  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustStyle('url(' + this.imageURL + ')');
  }

}
