import { Component, Input, OnInit } from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import 'hammerjs';


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

  /* tslint:disable */
  private x: number = 0;
  private y: number = 0;
  /* tslint:enable */
  private image: SafeStyle;

  /* pan/rotate event book keeping */
  private startX: number = 0;
  private startY: number = 0;

  constructor(private sanitizer: DomSanitizer) {
  }

  public getMaskStyles() {
    return {
      'height': this.maskHeight + 'px',
      'width': this.maskWidth + 'px'
    };
  }

  public getImageStyles() {
    return {
      'height': this.imageHeight + 'px',
      'width': this.imageWidth + 'px'
    };
  }

  onRotate(event: any /** TODO #9100 */): void {
    event.preventDefault();
    this.rotation = event.rotation;
  }

  onPanStart(event: any): void {
    this.startX = this.x;
    this.startY = this.y;
  }

  onPan(event: any /** TODO #9100 */): void {
    event.preventDefault();
    this.x = this.startX + event.deltaX;
    this.y = this.startY + event.deltaY;
  }

  public onKey(event): void {
    console.log(event.key);
  }
  ngOnInit() {
    this.image = this.sanitizer.bypassSecurityTrustStyle('url(' + this.imageURL + ')');
  }

}
