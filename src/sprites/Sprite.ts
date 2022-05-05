import { createID } from '../Snowflake';

type SpriteData = Record<`x` | `y` | `z` | `r` | `width` |`height` | `size` | `rotation`, number>;

class Sprite {
    id: string;

    x: number;
    y: number;

    scale: Record<`width` | `height`, number>;

    draw: (context: CanvasRenderingContext2D) => void;

    constructor (id?: Sprite[`id`]) {
        this.id = id ?? createID();

        this.scale = {
            width: 0,
            height: 0
        };
    }
}

export default Sprite;
