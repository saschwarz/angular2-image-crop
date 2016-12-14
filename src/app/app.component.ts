import { Component } from '@angular/core';
import {
  CroppedImage, Dimensions, DimensionedCroppedImage, DimensionedImage,
  DimensionedMask, Grid, Image, Mask, Units
} from '../lib/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 2 Image Crop UI Experiment';
  mask = new Mask('mask', 200, 200);
  image = new Image('image', 400, 400, 'assets/flatiron.jpeg');
  cropped = new CroppedImage(this.image, this.mask, 100, 100, 0);
  grid = new Grid(Units.feet, 100, 80, 10);

  image2 = new Image('image 2', 800, 800, 'assets/200x200.png');
  dImage = new DimensionedImage(this.image2, Units.feet, 200, 200);
  mask2 = new Mask('mask 2', 400, 400);
  dMask = new DimensionedMask(this.mask2, Units.feet, 100.1, 100.1);
  dCropped = new DimensionedCroppedImage(this.dImage, this.dMask, 10, 10);

  units = Units;
  unitValues = [];

  constructor() {
    this.unitValues = Object.keys(this.units).filter(x => !isNaN(parseInt(x, 10)));
  }

  changeUnits(event): void {
    // select list returns string and we want to set mask's dimensioned units
    // to enum number
    this.dMask.units = parseInt(event, 10);
  }
}
