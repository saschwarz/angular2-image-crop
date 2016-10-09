import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent implements OnInit {
  image: SafeStyle;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number;
  transform: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {
    this.image = this.sanitizer.bypassSecurityTrustStyle('url(' + '/assets/course.png' + ')');
    this.width = 300;
    this.height = 200;
    this.x = 0;
    this.y = 0;
    this.rotation = 30;
  }

  public getMaskStyles() {
    return {
      'height': this.height + 'px',
      'width': this.width + 'px'
    };
  }

  public getImageStyles() {
    this.transform = this.sanitizer.bypassSecurityTrustStyle('rotate(' + this.rotation + 'deg)');
    return {
      'background-position': this.x + 'px ' + this.y + 'px',
      'background-image': this.image,
      'height': this.height + 'px',
      'width': this.width + 'px'
    };
  }

  ngOnInit() {
  }

}
