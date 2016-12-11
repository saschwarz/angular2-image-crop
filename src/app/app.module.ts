import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'hammerjs';
import 'hammer-timejs';

import { AppComponent } from './app.component';
import { ImageCropComponent } from '../lib/image-crop/image-crop.component';
import { DimensionedImageCropComponent } from '../lib/dimensioned-image-crop/dimensioned-image-crop.component';
import { CroppedImageComponent } from '../lib/cropped-image/cropped-image.component';
import { DimensionedCroppedImageComponent } from '../lib/dimensioned-cropped-image/dimensioned-cropped-image.component';
import { GridImageComponent } from '../lib/grid-image/grid-image.component';
import { RotatorComponent } from '../lib/rotator/rotator.component';
import { DragMoveDirective } from '../lib/drag-move.directive';
import { PinchResizeDirective } from '../lib/pinch-resize.directive';
import { MouseDownPreventDefaultDirective } from '../lib/mouse-down-prevent-default.directive';
import { LocateTouchDirective } from '../lib/locate-touch.directive';
import { CrossHairComponent } from '../lib/cross-hair.component';

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
    PinchResizeDirective,
    MouseDownPreventDefaultDirective,
    LocateTouchDirective,
    CrossHairComponent
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
