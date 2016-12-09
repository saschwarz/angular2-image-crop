import { Component } from '@angular/core';
import { Dimensions, DimensionedImage, Grid, Image, Mask, Units } from '../lib/models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 2 Image Crop UI Experiment';
  mask = new Mask({
    width: 200,
    height: 200,
    x: 100,
    y: 100
  });
  image = new Image({
    width: 400,
    height: 400,
    rotation: 0,
    url: 'assets/flatiron.jpeg'
  });
  grid = new Grid({ width: 100, height: 80, spacing: 10, units: Units.meters });
  mask2 = new Mask({
    width: 400,
    height: 400,
    x: 200,
    y: 200
  });
  image2 = new Image({
    width: 800,
    height: 800,
    rotation: 0,
    url: 'assets/200x200.png'
  });
  mDims = new Dimensions({y: 50, width: 100.1, height: 100.1, units: Units.feet});
  iDims = new Dimensions({width: 200, height: 200, units: Units.feet});
  dImage = new DimensionedImage(this.image2, this.iDims);
  dMask = new DimensionedImage(this.mask2, this.mDims);
  units = Units;
  unitValues = [];

  constructor() {
    this.unitValues = Object.keys(this.units).filter(x => !isNaN(parseInt(x, 10)) );
  }

  changeUnits(event): void {
    // select list returns string and we want to set mask's dimensioned units
    // to enum number
    this.dMask.dimensions.units = parseInt(event, 10);
  }
}
