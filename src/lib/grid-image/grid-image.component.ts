import { Component, Input } from '@angular/core';
import { Grid } from '../models';


@Component({
  selector: 'grid-image',
  templateUrl: './grid-image.component.html',
  styleUrls: ['./grid-image.component.css']
})
export class GridImageComponent {
  @Input() grid: Grid;
}
