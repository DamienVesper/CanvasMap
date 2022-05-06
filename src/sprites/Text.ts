import { Sprite, SpriteOpts } from './Sprite';

interface TextOpts extends SpriteOpts {
    text: string
    font?: string

    align?: CanvasTextDrawingStyles[`textAlign`]
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
    font: string;
    align: CanvasTextDrawingStyles[`textAlign`];
    baseline: CanvasTextDrawingStyles[`textBaseline`];

    size: TextOpts[`size`];

    fill: TextOpts[`fill`];
    stroke: TextOpts[`stroke`];

    /**
     * Create a new Text sprite.
     * @param opts Sprite options.
     */
    constructor (opts: TextOpts) {
        super(opts.id, opts.x, opts.y);

        this.text = opts.text;
        this.font = opts.font ?? `serif`;
        this.size = opts.size;
        this.align = opts.align ?? `center`;
        this.baseline = opts.baseline ?? `alphabetic`;

        this.fill = opts.fill;
        this.stroke = opts.stroke;
    }

    public readonly draw = (context: CanvasRenderingContext2D): void => {
        context.textAlign = this.align;
        context.textBaseline = this.baseline;

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
