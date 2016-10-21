import { Component } from '@angular/core';
import { Image } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 2 Image Crop UI Experiment';
  mask = new Image({width: 300,
                    height: 300,
                    x: 300,
                    y: 300});
  image = new Image({width: 600,
                     height: 600,
                     rotation: 90,
                     url: 'https://unsplash.it/600/600'})
}
