import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer, ViewChild} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import 'hammerjs';


@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent implements OnInit, AfterViewInit {
  private image: SafeStyle;
  // pan/rotate event book keeping
  private startX: number;
  private startY: number;
  private startRotation: number;
  private startMaskWidth: number;
  private startMaskHeight: number;

  @ViewChild('display') display: ElementRef;

  @Input() imageURL: string;
  @Input() imageWidth: number;
  @Input() imageHeight: number;
  @Input() maskWidth: number;
  @Input() maskHeight: number;
  @Input() rotation: number = 0;
  @Input() x: number = 0;
  @Input() y: number = 0;

  @HostListener('keyup', ['$event'])
  onKey(event: KeyboardEvent): void {
      if (event.srcElement && event.srcElement.className === 'display') {
        // TODO find a way to only supply key events when display has focus
        event.stopPropagation();
        event.preventDefault();
        let delta = event.shiftKey ? 10 : 1;
        switch (event.code) {
          case 'ArrowLeft':
            this.x -= delta;
            break;
          case 'ArrowRight':
            this.x += delta;
            break;
          case 'ArrowDown':
            this.y += delta;
            break;
          case 'ArrowUp':
            this.y -= delta;
            break;
          case 'Equal':
            this.rotation += delta;
            break;
          case 'Minus':
            this.rotation -= delta;
            break;
        }
      }
  }

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer) {
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

  onGestureStart(event: any): void {
    event.preventDefault();
    this.startX = this.x;
    this.startY = this.y;
    this.startRotation = Math.floor(parseInt(<string><any>event.rotation, 10) - parseInt(<string><any>this.rotation, 10)) % 360;
    this.startMaskHeight = this.maskHeight;
    this.startMaskWidth = this.maskWidth;
  }

  onPan(event: any): void {
    event.preventDefault();
    this.x = this.startX + event.deltaX;
    this.y = this.startY + event.deltaY;
  }

  onRotate(event: any): void {
    event.preventDefault();
    this.rotation = Math.floor((event.rotation - this.startRotation)) % 360;
  }

  onPinch(event: any): void {
    event.preventDefault();
    this.maskHeight = Math.floor(this.startMaskHeight * event.scale);
    this.maskWidth = Math.floor(this.startMaskWidth * event.scale);
  }

  ngOnInit(): void {
    this.image = this.sanitizer.bypassSecurityTrustStyle('url(' + this.imageURL + ')');
  }

  ngAfterViewInit(): void {
    this.renderer.invokeElementMethod(this.display.nativeElement, 'focus', []);
  }
}
