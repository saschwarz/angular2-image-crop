/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { GridImageComponent } from './grid-image.component';
import { Grid, Units } from '../models';


describe('Component: GridImage', () => {
  beforeEach( () => {
    this.grid = new Grid({width: 100, height: 80, spacing: 10, units: Units.meters});
  });

  it('should create an instance', () => {
    expect(this.grid).toBeTruthy();
  });

  it('should return 7 horizontal lines', () => {
    let lines = this.grid.horizontalLines();
    expect(lines.length).toEqual(7);
    expect(lines).toEqual([10, 20, 30, 40, 50, 60, 70]);
  });

    it('should return 9 vertical lines', () => {
    let lines = this.grid.verticalLines();
    expect(lines.length).toEqual(9);
  });
});
