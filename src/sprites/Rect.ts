import Sprite from './Sprite';

interface RectOpts {
    id?: string

    x: number
    y: number

    width: number,
    height: number

    fill?: string;
    stroke?: {
        color: string
        width: number
    }
}

class Rect extends Sprite {
    width: number;
    height: number;

    fill: RectOpts[`fill`];
    stroke: RectOpts[`stroke`];

    constructor (opts: RectOpts) {
        super(opts.id);

        this.width = opts.width;
        this.height = opts.height;

        this.fill = opts.fill;
        this.stroke = opts.stroke;
    }

    public readonly draw = (context: CanvasRenderingContext2D): void => {
        if (this.fill !== undefined) {
            context.fillStyle = this.fill;
            context.fillRect(this.x, this.y, this.width, this.height);
        }

        if (this.stroke !== undefined) {
            context.strokeStyle = this.stroke.color;
            context.lineWidth = this.stroke.width * this.scale.width;

            context.strokeRect(this.x, this.y, this.width, this.height);
        }
    };
}

export default Rect;
