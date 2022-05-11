<div align="center">
    <h1>@damienvesper/canvas-map</h1>
    <p>A canvas mapping library, ported to TypeScript.</p>
    <div>
        <img src="https://shields.io/github/package-json/v/DamienVesper/CanvasMap?style=for-the-badge&color=5e03fc">
    </div>
    <hr />
</div>

## Usage
```ts
import { CanvasMap, Text } from '@damienvesper/canvas-map';

const canvas = document.querySelector(`canvas`);
const map = new CanvasMap(canvas, 200, 200);

// Add a text to the map.
map.add(new Text({
    id: `hello-world-text`,
    x: 100,
    y: 100,
    text: `Hello World`,
    fill: `rgba(0, 0, 0, 1)`,
    size: 200
}));

// Render elements to the canvas.
map.draw();
```
