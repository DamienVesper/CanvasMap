import Sprite from './Sprite';

interface TriangleOpts {
    id?: string

    x: number
    y: number

    size: number;
    rotation: number;

    fill?: string;
    stroke?: {
        color: string
        width: number
    }
}

class Triangle extends Sprite {
    size: TriangleOpts[`size`];
    rotation: TriangleOpts[`rotation`];

    fill: TriangleOpts[`fill`];
    stroke: TriangleOpts[`stroke`];

    constructor (opts: TriangleOpts) {
        super(opts.id);

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

        context.restore();
    };
}

export default Triangle;
