import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'hammerjs';
import 'hammer-timejs';

import { AppComponent } from './app.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { DimensionedImageCropComponent } from './dimensioned-image-crop/dimensioned-image-crop.component';
import { CroppedImageComponent } from './cropped-image/cropped-image.component';
import { DimensionedCroppedImageComponent } from './dimensioned-cropped-image/dimensioned-cropped-image.component';
import { GridImageComponent } from './grid-image/grid-image.component';
import { RotatorComponent } from './rotator/rotator.component';
import { DragMoveDirective } from './dragmove.directive';
import { PinchResizeDirective } from './pinchresize.directive';

@NgModule({
  declarations: [
    AppComponent,
    ImageCropComponent,
    DimensionedImageCropComponent,
    CroppedImageComponent,
    DimensionedCroppedImageComponent,
    GridImageComponent,
    RotatorComponent,
    DragMoveDirective,
    PinchResizeDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
