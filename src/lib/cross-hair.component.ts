import { Component, Input } from '@angular/core';
import { Dimensions } from './models';

/**
 * SVG component showing a cross hair and location.
 */
@Component({
    selector: '[crossHair]',
    styles: [`.location {
        fill: transparent;
    }
    .location-line, .location-text {
        font-family: "monospace";
        fill: blue;
        stroke: blue;
        stroke-width: 0.2;
    }
    .location-text {
        fill: white;
        stroke: transparent;
    }
    .location:hover, .location-line:hover, .location-text:hover {
        cursor: pointer;
        border: 1px solid blue;
    }`
    ],
    template: `<svg:rect attr.x="{{x-3}}" attr.y="{{y-3}}" width="6" height="6" class="location"/>
        <svg:line attr.x1="{{x-2}}" attr.x2="{{x+2}}" attr.y1="{{y}}" attr.y2="{{y}}" class="location-line"/>
        <svg:line attr.x1="{{x}}" attr.x2="{{x}}" attr.y1="{{y-2}}" attr.y2="{{y+2}}" class="location-line"/>
        <svg:rect attr.x="{{x+2}}" attr.y="{{y-5}}" width="20" height="4" class="location-text"/>
        <svg:text attr.x="{{x}}" attr.y="{{y}}" dx="2" dy="-2" font-size="3" class="location-line">
            {{displayUnits()}}
        </text>`
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
