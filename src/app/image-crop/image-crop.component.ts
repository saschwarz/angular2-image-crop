import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

class Mask {
  width: Number;
  height: Number;
}

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

  constructor(sanitizer: DomSanitizer) {
    this.image = sanitizer.bypassSecurityTrustStyle('url(' + '/assets/course.png' + ')');
    this.width = 100;
    this.height = 200;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
  }

  public getStyles(){
    return {
      'background-position': this.x + 'px ' + this.y + 'px',
      'height': this.height + 'px',
      'width': this.width + 'px'
    }
  }

  ngOnInit() {
  }

}
