import { Sprite, SpriteOpts } from './Sprite';

interface PointOpts extends SpriteOpts {
    radius: number

    fill?: string
    stroke?: {
        color: string
        width: number
    }
}
class Point extends Sprite implements PointOpts {
    radius: PointOpts[`radius`];

    fill: PointOpts[`fill`];
    stroke: PointOpts[`stroke`];

    /**
     * Create a new Point sprite.
     * @param opts Sprite options.
     */
    constructor (opts: PointOpts) {
        super(opts.id, opts.x, opts.y);

        this.radius = opts.radius;

        this.fill = opts.fill;
        this.stroke = opts.stroke;
    }

    public readonly draw = (context: CanvasRenderingContext2D): void => {
        if (this.fill !== undefined) {
            context.fillStyle = this.fill;

            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.fill();
        }

        if (this.stroke !== undefined) {
            context.strokeStyle = this.stroke.color;
            context.lineWidth = this.stroke.width * this.scale.width;

            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
            context.stroke();
        }
    };
}

export default Point;
