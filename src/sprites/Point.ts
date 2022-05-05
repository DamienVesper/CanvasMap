import Sprite from './Sprite';

interface PointOpts {
    id?: string

    x: number;
    y: number;

    radius: number;

    fill?: string;
    stroke?: {
        color: string
        width: number
    }
}
class Point extends Sprite {
    radius: number;

    fill: PointOpts[`fill`];
    stroke: PointOpts[`stroke`];

    constructor (opts: PointOpts) {
        super(opts.id);

        this.radius = opts.radius;

        this.fill = opts.fill;
        this.stroke = opts.stroke;
    }

    public readonly draw = (context: CanvasRenderingContext2D): void => {
        if (this.fill !== undefined) {
            context.fillStyle = this.fill;

            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !0);
            context.fill();
        }

        if (this.stroke !== undefined) {
            context.strokeStyle = this.stroke.color
            context.lineWidth = this.stroke.width * this.scale.width

            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !0)
            context.stroke();
        }

    };
}

export default Point;
