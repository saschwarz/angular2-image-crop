/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { DimensionedImageCropComponent } from './dimensioned-image-crop/dimensioned-image-crop.component';
import { CroppedImageComponent } from './cropped-image/cropped-image.component';
import { DimensionedCroppedImageComponent } from './dimensioned-cropped-image/dimensioned-cropped-image.component';
import { GridImageComponent } from './grid-image/grid-image.component';


describe('App: AngularImageCrop', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ImageCropComponent,
        DimensionedImageCropComponent,
        CroppedImageComponent,
        DimensionedCroppedImageComponent,
        GridImageComponent
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpModule
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
