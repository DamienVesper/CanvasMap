import { createID } from '../Snowflake';

type SpriteData = Record<`x` | `y` | `z` | `r` | `width` |`height` | `size` | `rotation`, number>;

class Sprite {
    id: string;

    scale: Record<`width` | `height`, number>;

    draw: () => void;

    constructor (id?: Sprite[`id`]) {
        this.id = id ?? createID();

        this.scale = {
            width: 0,
            height: 0
        };
    }

    public readonly getData = (data: Partial<SpriteData>): Partial<SpriteData> => {
        const newData = Object.assign({}, data);

        if (data.x !== undefined) newData.x = data.x * this.scale.width;
        if (data.y !== undefined) newData.y = data.y * this.scale.width;

        if (data.r !== undefined) newData.r = data.r * this.scale.width;

        if (data.width !== undefined) newData.r = data.width * this.scale.width;
        if (data.height !== undefined) newData.r = data.height * this.scale.height;

        if (data.size !== undefined) newData.r = data.size * this.scale.width;
        if (data.rotation !== undefined) newData.rotation = data.rotation;

        return newData;
    };
}

export default Sprite;
