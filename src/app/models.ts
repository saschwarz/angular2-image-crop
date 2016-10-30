
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
 * The x/y location is relative to the top left corner of
 * the Image over which this Mask is overlayed in pixels.
 */
export class Mask extends Image {
    x: number = 0;
    y: number = 0;

    constructor(object: any) {
        super(object);
        this.x = object.x || 0;
        this.y = object.y || 0;
    }
}

/**
 * Actual units represented by the Image/Mask.
 * To support conversions.
 */
export enum Units {
    inches,
    feet,
    meters
}

/**
 * The relative location and size of an Image or Mask
 */
export class Dimensions {
    /**
     * Units for all dimension attributes.
     */
    units: Units = Units.meters;
    /**
     * X location in units.
     */
    x: number = 0;
    /**
     * Y location in units.
     */
    y: number = 0;
    /**
     * Width in units.
     */
    width: number;
    /**
     * Height in units.
     */
    height: number;

    constructor({units = Units.meters, width = 100, height = 100, x = 0, y = 0} = {}) {
        this.units = units;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
}


/**
 * DimensionedImage is an Image with a dimensions member describing
 * the Image's real world size.
 */
export class DimensionedImage {
    image: Image;
    dimensions: Dimensions;

    constructor(image: Image, dimensions: Dimensions) {
        this.image = image;
        this.dimensions = dimensions;
    }
};


export class Grid {
    units: Units = Units.meters;
    width: number;
    height: number;
    spacing: number;

    constructor(object: any) {
        this.units = object.units;
        this.width = object.width;
        this.height = object.height;
        this.spacing = object.spacing;
    }

    private lines(max: number) {
        let i = 0;
        let lines: Array<number> = [];
        while (true) {
            let y = ++i * this.spacing;
            if (y < max) {
                lines.push(y);
            } else {
                return lines;
            }
        }
    }

    public horizontalLines() {
        return this.lines(this.height);
    }

    public verticalLines() {
        return this.lines(this.width);
    }
}
