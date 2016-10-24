import { Component } from '@angular/core';
import { Image, Mask } from './models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular 2 Image Crop UI Experiment';
  mask = new Mask({width: 300,
                    height: 300,
                    x: 150,
                    y: 150});
  image = new Image({width: 600,
                     height: 600,
                     rotation: 0,
                     url: 'assets/flatiron.jpeg'
                    });
}
