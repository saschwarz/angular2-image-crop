import { Component, Input } from '@angular/core';
import { Dimensions } from '../models';

/**
 * SVG component showing a cross hair and location.
 */
@Component({
    selector: '[crossHair]',
    styleUrls: ['./cross-hair.component.css'
    ],
    templateUrl: './cross-hair.component.html'
})
export class CrossHairComponent {
    @Input('attr.x') x: number = 0;
    @Input('attr.y') y: number = 0;
    @Input('attr.dimensions') dimensions: Dimensions = new Dimensions();

    // numeric representation in mask units
    displayUnits(): string {
        return `${this.dimensions.displayValue(this.x)}, ${this.dimensions.displayValue(this.y)}`;
    }
}
