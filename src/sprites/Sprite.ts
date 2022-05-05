import { createID } from '../Snowflake';

type SpriteData = Record<`x` | `y` | `z` | `r` | `width` |`height` | `size` | `rotation`, number>;

class Sprite {
    id: string;

    x: number;
    y: number;

    r: number;

    width: number;
    height: number;

    size: number;
    rotation: number;

    scale: Record<`width` | `height`, number>;

    draw: () => void;

    constructor (id?: Sprite[`id`]) {
        this.id = id ?? createID();

        this.scale = {
            width: 0,
            height: 0
        };
    }

    public readonly getData = (): Partial<SpriteData> => {
        const data: Partial<SpriteData> = {};

        if (this.x !== undefined) data.x = this.x * this.scale.width;
        if (this.y !== undefined) data.y = this.y * this.scale.width;

        if (this.r !== undefined) data.r = this.r * this.scale.width;

        if (this.width !== undefined) data.width = this.width * this.scale.width;
        if (this.height !== undefined) data.height = this.height * this.scale.height;

        if (this.size !== undefined) data.size = this.size * this.scale.width;
        if (this.rotation !== undefined) data.rotation = this.rotation;

        return data;
    };
}

export default Sprite;
