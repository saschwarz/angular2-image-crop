import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { DimensionedImageCropComponent } from './dimensioned-image-crop/dimensioned-image-crop.component';
import { CroppedImageComponent } from './cropped-image/cropped-image.component';
import { DimensionedCroppedImageComponent } from './dimensioned-cropped-image/dimensioned-cropped-image.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageCropComponent,
    DimensionedImageCropComponent,
    CroppedImageComponent,
    DimensionedCroppedImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent,
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
})
export class AppModule { }
