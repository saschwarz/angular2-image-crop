import { AfterViewChecked, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { CroppedImage } from '../models';


@Component({
  selector: 'image-crop',
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.css']
})
export class ImageCropComponent implements AfterViewChecked  {
  @Input() cropped: CroppedImage;
  @ViewChild('display') display: ElementRef;
  private viewHeight: number = 0;

  public ngAfterViewChecked(): void {
    if (this.viewHeight !== this.display.nativeElement.clientHeight - 1) {
      // don't take full height or end up in endless loop as parent container
      // resizes and this is called again and again.
      setTimeout(() => this.viewHeight = this.display.nativeElement.clientHeight - 1, 0);
    }
  }

  @HostListener('keyup', ['$event'])
  protected onKey(event: KeyboardEvent): void {
      // only exercised when the element has focus
      event.stopPropagation();
      event.preventDefault();
      let delta = event.shiftKey ? 10 : 1;
      switch (event.code) {
        case 'ArrowLeft':
          this.cropped.x -= delta;
          break;
        case 'ArrowRight':
          this.cropped.x += delta;
          break;
        case 'ArrowDown':
          this.cropped.y += delta;
          break;
        case 'ArrowUp':
          this.cropped.y -= delta;
          break;
        case 'Equal':
          this.cropped.rotation += delta;
          break;
        case 'Minus':
          this.cropped.rotation -= delta;
          break;
      }
  }

  protected onPan(event: any): void {
    this.cropped.x = event.x;
    this.cropped.y = event.y;
  }

  protected rotateTo(degrees: number): void {
    this.cropped.rotation = Math.floor(degrees) % 360;
  }

  protected onSizeChange(event: any): void {
    this.cropped.mask.height = event.height;
    this.cropped.mask.width = event.width;
  }
}
