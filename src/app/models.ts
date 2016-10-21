/**
 * Actual units represented within the image.
 */
export enum Units {
    inches,
    feet,
    meters
}


export class Image {
    title: string = '';
    /**
     * Image width in pixels.
     */
    width: number;
    /**
     * Image height in pixels.
     */
    height: number;
    /**
     * Optional URL for mask/image.
     */
    url: URL;
    /**
     * Rotation in degrees about the center of the image.
     */
    rotation: number = 0;

    constructor(object: any) {
        this.title = object.title || '';
        this.width = object.width;
        this.height = object.height;
        this.url = object.url || '';
        this.rotation = object.rotation || 0;
    }
}

/**
 * Mask is an area or image overlayed/cropping an Image.
 * The x/y location is relative to the Image over which
 * this Mask is overlayed.
 */
export class Mask extends Image {
    x: number = 0;
    y: number = 0;

    constructor(object: any) {
        super(object);
        this.x = object.x;
        this.y = object.y;
    }
}

/**
 * ScaledImage is
 */
export class ScaledImage extends Image {
    units: Units;
    /**
     * Width in units.
     */
    actualWidth: number;
    /**
     * Height in units.
     */
    actualHeight: number;

    scaledWidthPixels: number;
    scaledHeightPixels: number;

    constructor(object: any) {
        super(object);
        this.units = object.units || Units.meters;
        this.actualWidth = object.actualWidth;
        this.actualHeight = object.actualHeight;
    }

    public widthPixelsPerMeter(pixels): number {
        let ratio = pixels / this.width;
        if (this.units === Units.feet) {
            ratio *= 0.3048;  // feet/meter
        }
        return ratio;
    }

    public scaleImage(pixelsPerMeter: number) {
        // Scale image to match
        const conversion = this.units === Units.meters ? 1 : 0.3048;
        this.scaledWidthPixels = this.width * pixelsPerMeter * conversion;
        this.scaledHeightPixels = this.height * pixelsPerMeter * conversion;
    }
};
