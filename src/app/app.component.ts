import { Component } from '@angular/core';
import { Dimensions, DimensionedImage, Grid, Image, Mask, Units } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 2 Image Crop UI Experiment';
  mask = new Mask({
    width: 300,
    height: 300,
    x: 150,
    y: 150
  });
  image = new Image({
    width: 600,
    height: 600,
    rotation: 0,
    url: 'assets/flatiron.jpeg'
  });
  grid = new Grid({ width: 100, height: 80, spacing: 10, units: Units.meters });
  dimensions = new Dimensions();
  dImage = new DimensionedImage(this.image, this.dimensions);
  dMask = new DimensionedImage(this.mask, this.dimensions);
}
