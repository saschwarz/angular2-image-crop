
export class Image {
    title: string = '';
    /**
     * Image width in pixels.
     */
    width: number = 0;
    /**
     * Image height in pixels.
     */
    height: number = 0;
    /**
     * Optional URL for Crop/image.
     */
    url: string = '';

    constructor(title = '', width = 0, height = 0, url = '') {
        this.title = title;
        this.width = width;
        this.height = height;
        this.url = url;
    }
}


/**
 *  Mask is an area or image overlayed/cropping an Image.
 */
export class Mask extends Image {
    opacity: number = 0;
    constructor(title = '', width = 0, height = 0, url = '', opacity = 0) {
        super(title, width, height, url);
        this.opacity = opacity;
    }
}


/**
 * CroppedImage holds the location of a Mask relative to an Image.
 * The x/y location is relative to the top left corner of
 * the Image over which this Mask is overlayed in pixels.
 * The rotation is the rotation about the center of the image.
 */
export class CroppedImage {
    image: Image;
    mask: Mask;
    x: number = 0;
    y: number = 0;
    /**
     * Rotation of image in degrees about the center of the image.
     */
    rotation: number = 0;

    constructor(image, mask, x = 0, y = 0, rotation = 0) {
        this.image = image;
        this.mask = mask;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
     }
}


/**
 * Origin locations
 */
export enum HorizontalOrigin {
    left,
    center,
    right
}

export enum VerticalOrigin {
    top,
    center,
    bottom
}

/**
 * Actual units represented by the Dimensioned Image/Crop.
 * To support conversions.
 */
export enum Units {
    feet,
    meters
}

/**
 * The location and size of an Image or Crop relative to it's container's origin.
 */
export class Dimensions {
    /**
     * Units for all dimension attributes.
     */
    units: Units = Units.meters;

    xOrigin: HorizontalOrigin = HorizontalOrigin.left;
    yOrigin: VerticalOrigin = VerticalOrigin.top;

    /**
     * Width in units.
     */
    width: number;
    /**
     * Height in units.
     */
    height: number;

    constructor(units = Units.meters, width = 0, height = 0, xOrigin = HorizontalOrigin.left, yOrigin = VerticalOrigin.top) {
        this.units = units;
        this.width = width;
        this.height = height;
        this.xOrigin = xOrigin;
        this.yOrigin = yOrigin;
    }

    displayValue(x: number): string {
        let display = '';
        switch (this.units) {
            case Units.meters:
                display = x.toFixed(1) + 'm';
                break;
            case Units.feet:
                // feet' inches"
                let feet = Math.trunc(x);
                let inches = Math.trunc((x - feet) * 12);
                display = [feet ? `${feet}'` : '', `${inches}"`].join(' ');
                break;
        }
        return display;
    }
}


/**
 * DimensionedImage is an Image with a dimensions member describing
 * the Image's real world size.
 */
export class DimensionedImage extends Dimensions {
    image: Image;

    constructor(image: Image, units = Units.meters, width = 0, height = 0, xOrigin = HorizontalOrigin.left, yOrigin = VerticalOrigin.top) {
        super(units, width, height, xOrigin, yOrigin);
        this.image = image;
    }
};


/**
 * DimensionedMask is an Mask with a dimensions member describing
 * the Mask's real world size.
 */
export class DimensionedMask extends Dimensions {
    mask: Mask;

    constructor(mask: Mask, units = Units.meters, width = 0, height = 0, xOrigin = HorizontalOrigin.left, yOrigin = VerticalOrigin.top) {
        super(units, width, height, xOrigin, yOrigin);
        this.mask = mask;
    }
};


/**
 * A DimensionedMask applied to a DimensionedImage at a specific location/rotation.
 */
export class DimensionedCroppedImage {
    // Has an Image not a Crop because the location
    // of the DimensionedCrop is specified in
    // Units not in pixels.
    image: DimensionedImage;
    mask: DimensionedMask;
    /**
     * X location in units from origin of it's container (if any).
     */
    x: number = 0;
    /**
     * Y location in units from origin of it's container (if any).
     */
    y: number = 0;
    /**
     * Rotation of image in degrees about the center of the image.
     */
    rotation: number = 0;

    constructor(image: DimensionedImage, mask: DimensionedMask, x = 0, y = 0, rotation = 0) {
        this.image = image;
        this.mask = mask;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }
}


/**
 * Represent a grid of horizontal and vertical lines
 * in the specific Units of width/height at spacing.
 */
export class Grid {
    units: Units = Units.meters;
    width: number;
    height: number;
    spacing: number;

    constructor(units: Units, width: number, height: number, spacing: number) {
        this.units = units;
        this.width = width;
        this.height = height;
        this.spacing = spacing;
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
