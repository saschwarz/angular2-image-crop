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
  @Input() x: number = 0;
  @Input() y: number = 0;

  private image: SafeStyle;

  /* pan/rotate event book keeping */
  private startX: number;
  private startY: number;
  private startRotation: number;

  constructor(private sanitizer: DomSanitizer) {
  }

  public getMaskStyles() {
    return {
      'height': this.maskHeight + 'px',
      'width': this.maskWidth + 'px'
    };
  }

  public preventDefault(event: any): void {
    // required on <image> tags to stop browser standard drag behavior
    event.preventDefault();
  }

  onRotate(event: any /** TODO #9100 */): void {
    event.preventDefault();
    this.rotation = Math.floor((event.rotation - this.startRotation)) % 360;
  }

  onGestureStart(event: any): void {
    event.preventDefault();
    this.startX = this.x;
    this.startY = this.y;
    this.startRotation = Math.floor(parseInt(<string><any>event.rotation, 10) - parseInt(<string><any>this.rotation, 10)) % 360;
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
