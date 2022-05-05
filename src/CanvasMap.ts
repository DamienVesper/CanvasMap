import Sprite from './sprites/Sprite';

/**
 * The canvas map instance.
 */
class CanvasMap {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    elements: Map<string, Sprite>;

    world: Record<`width` | `height` | `rotation`, number>;
    scale: Record<`width` | `height`, number>;
    zoom: number;

    constructor (canvas: HTMLCanvasElement, width: number, height: number) {
        const context = canvas.getContext(`2d`);
        if (context === null) throw new Error(`[CanvasMap]: Error getting canvas context.`);

        this.canvas = canvas;
        this.context = context;

        this.elements = new Map();

        this.world = { width, height, rotation: 0 };
        this.scale = { width: 0, height: 0 };
        this.zoom = 1;
    }

    /**
     * Add a sprite to the canvas.
     * @param sprite A CanvasMap sprite.
     */
    public readonly add = (sprite: Sprite): void => {
        if (this.elements.get(sprite.id) !== null) throw new Error(`[CanvasMap]: Attempted to add duplicate element.`);
        this.elements.set(sprite.id, sprite);
    };

    /**
     * Remove a sprite from the canvas..
     * @param id The ID of the sprite.
     */
    public readonly remove = (id: string): void => {
        if (this.elements.get(id) === null) throw new Error(`[CanvasMap]: Attempted to remove missing element.`);
        this.elements.delete(id);
    };

    /**
     * Draw all elements.
     */
    public readonly draw = (): void => {
        const fov = {
            width: this.canvas.width * this.zoom,
            height: this.canvas.height * this.zoom
        };

        this.scale.width = (1 / this.world.width) * this.canvas.width;
        this.scale.height = (1 / this.world.height) * this.canvas.height;

        this.context.resetTransform();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.world.rotation !== 0 && 
            (this.context.translate(this.canvas.width / 2, this.canvas.height / 2),
            this.context.rotate(this.world.rotation),
            this.context.translate(-this.canvas.width / 2, -this.canvas.height / 2));

        this.context.translate(-((fov.width - this.canvas.width) / 2), -((fov.height - this.canvas.height) / 2));
        this.context.scale(this.zoom, this.zoom);

        for (const sprite of this.elements.values()) sprite.draw();
    };
}

export default CanvasMap;
