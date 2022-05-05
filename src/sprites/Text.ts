import Sprite from './Sprite';

interface TextOpts {
    id?: string

    x: number
    y: number

    text: string
    font: string
    align: CanvasTextDrawingStyles[`textAlign`]
    baseline?: CanvasTextDrawingStyles[`textBaseline`]

    size: number

    fill?: string
    stroke?: {
        color: string
        width: number
    }
}
class Text extends Sprite implements TextOpts {
    text: TextOpts[`text`];
    font: TextOpts[`font`];
    align: TextOpts[`align`];
    baseline: TextOpts[`baseline`];

    size: TextOpts[`size`];

    fill: TextOpts[`fill`];
    stroke: TextOpts[`stroke`];

    constructor (opts: TextOpts) {
        super(opts.id);

        this.text = opts.text;
        this.font = opts.font;
        this.align = opts.align;
        this.baseline = opts.baseline ?? `alphabetic`;

        this.fill = opts.fill;
        this.stroke = opts.stroke;
    }

    public readonly draw = (context: CanvasRenderingContext2D): void => {
        context.textAlign = this.align;
        if (this.baseline !== undefined) context.textBaseline = this.baseline;

        context.font = `${this.size}px ${this.font}`;

        if (this.fill !== undefined) {
            context.fillStyle = this.fill;
            context.fillText(this.text, this.x, this.y);
        }

        if (this.stroke !== undefined) {
            context.strokeStyle = this.stroke.color;
            context.lineWidth = this.stroke.width * this.scale.width;
            context.strokeText(this.text, this.x, this.y);
        }
    };
}

export default Text;
