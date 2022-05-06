import Point from './sprites/Point';
import Rect from './sprites/Rect';
import { Sprite } from './sprites/Sprite';
import Text from './sprites/Text';
import Triangle from './sprites/Triangle';

/**
 * The canvas map instance.
 */
class CanvasMap {
    context: CanvasRenderingContext2D;

    elements: Map<string, Sprite>;

    world: Record<`width` | `height` | `rotation`, number>;
    scale: Record<`width` | `height`, number>;

    zoom: number;
    useRadians: boolean;

    /**
     * Create a CanvasMap instance.
     * @param canvas The canvas to render to.
     * @param width The width of the world.
     * @param height The height of the world.
     * @param useRadians Whether to use degrees or radians.
     */
    constructor (canvas: HTMLCanvasElement, width: number, height: number, useRadians?: false) {
        const context = canvas.getContext(`2d`);
        if (context === null) throw new Error(`[CanvasMap]: Error getting canvas context.`);

        this.context = context;

        this.elements = new Map();

        this.world = {
            width,
            height,
            rotation: 0
        };

        this.scale = {
            width: (1 / this.world.width) * this.context.canvas.width,
            height: (1 / this.world.height) * this.context.canvas.height
        };

        this.zoom = 1;
        this.useRadians = useRadians ?? true;
    }

    /**
     * Add a sprite to the canvas.
     * @param sprite A CanvasMap sprite.
     */
    public readonly add = (sprite: Sprite): CanvasMap => {
        sprite.scale = this.scale;

        sprite.x *= this.scale.width;
        sprite.y *= this.scale.height;

        if (sprite instanceof Point) sprite.radius *= this.scale.width;
        if (sprite instanceof Rect) {
            sprite.width *= this.scale.width;
            sprite.height *= this.scale.height;
        }
        if (sprite instanceof Text ||
            sprite instanceof Triangle) sprite.size *= this.scale.width;
        if (sprite instanceof Triangle && !this.useRadians) sprite.rotation *= Math.PI / 180;

        this.elements.set(sprite.id, sprite);
        return this;
    };

    /**
     * Remove a sprite from the canvas..
     * @param id The ID of the sprite.
     */
    public readonly remove = (id: string): CanvasMap => {
        this.elements.delete(id);
        return this;
    };

    /**
     * Draw all elements.
     */
    public readonly draw = (): CanvasMap => {
        const fov = {
            width: this.context.canvas.width * this.zoom,
            height: this.context.canvas.height * this.zoom
        };

        this.context.resetTransform();
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        if (this.world.rotation !== 0) {
            this.context.translate(this.context.canvas.width / 2, this.context.canvas.height / 2);
            this.context.rotate(this.world.rotation);
            this.context.translate(-this.context.canvas.width / 2, -this.context.canvas.height / 2);
        }

        this.context.translate(-((fov.width - this.context.canvas.width) / 2), -((fov.height - this.context.canvas.height) / 2));
        this.context.scale(this.zoom, this.zoom);

        for (const sprite of this.elements.values()) sprite.draw(this.context);
        return this;
    };

    /**
     * Clear all elements.
     */
    public readonly clear = (): CanvasMap => {
        for (const id of this.elements.keys()) this.elements.delete(id);
        return this;
    };
}

export default CanvasMap;
