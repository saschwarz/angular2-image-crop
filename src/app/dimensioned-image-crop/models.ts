
export enum Units {
    metric,
    imperial
}


export class Place {
    private name: string = '';
    private notes: string = '';
    private width: number;
    private height: number;
    private units: Units;

    constructor(object: any) {
        this.name = object.name;
        this.notes = object.notes;
        this.width = object.width;
        this.height = object.height;
        this.units = object.units;
    }

    widthPixelsPerMeter(pixels): number {
        let ratio = pixels / this.width;
        if (this.units === Units.imperial) {
            ratio *= 0.3048;  // feet/meter
        }
        return ratio;
    }
}


export class Course {
    private name: string = '';
    private notes: string = '';
    private width: number;
    private height: number;
    private units: Units;

    private imageUrl: URL;
    private imageNaturalWidth: number;
    private imageNaturalHeight: number;

    private imageScaledWidth: number;
    private imageScaledHeight: number;

    constructor(object: any) {
        this.name = object.name;
        this.notes = object.notes;
        this.width = object.width;
        this.height = object.height;
        this.units = object.units;

        this.imageUrl = object.imageUrl;
        this.imageNaturalWidth = object.imageNaturalWidth;
        this.imageNaturalHeight = object.imageNaturalHeight;
        this.imageScaledWidth = this.imageNaturalWidth;
        this.imageScaledHeight = this.imageNaturalHeight;
    }

    scaleImage(pixelsPerMeter: number) {
        // Scale image to match
        const conversion = this.units === Units.metric ? 1 : 0.3048;
        this.imageScaledWidth = this.width * pixelsPerMeter * conversion;
        this.imageScaledHeight = this.height * pixelsPerMeter * conversion;
    }
};
