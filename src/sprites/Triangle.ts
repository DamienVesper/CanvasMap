import { Sprite, SpriteOpts } from './Sprite';

interface TriangleOpts extends SpriteOpts {
    size: number
    rotation: number

    fill?: string
    stroke?: {
        color: string
        width: number
    }
}

class Triangle extends Sprite implements TriangleOpts {
    size: TriangleOpts[`size`];
    rotation: TriangleOpts[`rotation`];

    fill: TriangleOpts[`fill`];
    stroke: TriangleOpts[`stroke`];

    /**
     * Create a new Triangle sprite.
     * @param opts Sprite options.
     */
    constructor (opts: TriangleOpts) {
        super(opts.id, opts.x, opts.y);

        this.size = opts.size;
        this.rotation = opts.rotation;

        this.fill = opts.fill;
        this.stroke = opts.stroke;
    }

    public readonly draw = (context: CanvasRenderingContext2D): void => {
        context.save();

        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.translate(-this.x, -this.y);

        const altitude = this.size / 2;
        if (this.fill !== undefined) {
            context.fillStyle = this.fill;

            context.beginPath();
            context.moveTo(this.x - altitude, this.y + altitude);
            context.lineTo(this.x, this.y - altitude);
            context.lineTo(this.x + altitude, this.y + altitude);
            context.lineTo(this.x - altitude, this.y + altitude);
            context.fill();
        }

        if (this.stroke !== undefined) {
            context.strokeStyle = this.stroke.color;
            context.lineWidth = this.stroke.width * this.scale.width;

            context.beginPath();
            context.moveTo(this.x - altitude, this.y + altitude);
            context.lineTo(this.x, this.y - this.size);
            context.lineTo(this.x + altitude, this.y + altitude);
            context.lineTo(this.x - altitude, this.y + altitude);
            context.stroke();
        }

        context.rotate(-this.rotation);
        context.restore();
    };
}

export default Triangle;
