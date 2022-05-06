interface SpriteOpts {
    readonly id: string

    x: number
    y: number
}

class Sprite implements SpriteOpts {
    readonly id: string;

    x: number;
    y: number;

    scale: Record<`width` | `height`, number>;

    public readonly draw: (context: CanvasRenderingContext2D) => void;

    constructor (id: Sprite[`id`], x: Sprite[`x`], y: Sprite[`y`]) {
        this.id = id;

        this.x = x;
        this.y = y;

        this.scale = {
            width: 0,
            height: 0
        };
    }
}

export {
    Sprite,
    SpriteOpts
};
