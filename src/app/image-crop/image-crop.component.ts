import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer, ViewChild} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import 'hammerjs';
import 'hammer-timejs';
import { Image, Mask } from '../models';


@Component({
  selector: 'app-image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent implements OnInit, AfterViewInit {
  // pan/rotate event book keeping
  private startX: number;
  private startY: number;
  private startRotation: number = 0;
  private startMaskWidth: number;
  private startMaskHeight: number;

  @ViewChild('display') display: ElementRef;

  @Input() mask: Mask;
  @Input() image: Image;

  @HostListener('keyup', ['$event'])
  protected onKey(event: KeyboardEvent): void {
      if (event.srcElement && event.srcElement.className === 'display') {
        // TODO find a way to only supply key events when display element has focus
        event.stopPropagation();
        event.preventDefault();
        let delta = event.shiftKey ? 10 : 1;
        switch (event.code) {
          case 'ArrowLeft':
            this.mask.x -= delta;
            break;
          case 'ArrowRight':
            this.mask.x += delta;
            break;
          case 'ArrowDown':
            this.mask.y += delta;
            break;
          case 'ArrowUp':
            this.mask.y -= delta;
            break;
          case 'Equal':
            this.image.rotation += delta;
            break;
          case 'Minus':
            this.image.rotation -= delta;
            break;
        }
      }
  }

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer) {
  }

  protected preventDefault(event: any): void {
    // required on <image> tags to stop browser standard drag behavior
    event.preventDefault();
  }

  protected onGestureStart(event: any): void {
    event.preventDefault();
    // hammerjs events give deltas since start of gesture so
    // capture the initial values so I can apply the deltas for
    // each event and update the view.
    this.startX = this.mask.x;
    this.startY = this.mask.y;
    this.startRotation = Math.floor(parseInt(<string><any>event.rotation, 10) - parseInt(<string><any>this.image.rotation, 10)) % 360;
    this.startMaskHeight = this.mask.height;
    this.startMaskWidth = this.mask.width;
  }

  protected onPan(event: any): void {
    event.preventDefault();
    this.mask.x = this.startX + event.deltaX;
    this.mask.y = this.startY + event.deltaY;
  }

  protected onRotate(event: any): void {
    event.preventDefault();
    this.image.rotation = Math.floor((event.rotation - this.startRotation)) % 360;
  }

  protected onPanRotateStart(event: any): void {
    // pan up/down on compass element rotates
    event.preventDefault();
    this.startRotation = this.image.rotation;
    this.startY = event.deltaY;
  }

  protected onPanRotate(event: any): void {
    // pan up/down on compass element rotates
    event.preventDefault();
    this.image.rotation = Math.floor((event.deltaY - this.startY) / 4 + this.startRotation) % 360;
  }

  protected onPinch(event: any): void {
    event.preventDefault();
    this.mask.height = Math.floor(this.startMaskHeight * event.scale);
    this.mask.width = Math.floor(this.startMaskWidth * event.scale);
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    // this.renderer.invokeElementMethod(this.display.nativeElement, 'focus', []);
  }
}
