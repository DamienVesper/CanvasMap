# CanvasMap
A canvas mapping library, ported to TypeScript.

<div align="center">
    <img src="https://shields.io/github/package-json/v/DamienVesper/CanvasMap?style=for-the-badge&color=5e03fc">
</div>

## Usage
```ts
import { CanvasMap, Text } from '@damienvesper/canvas-map';

const canvas = document.querySelector(`canvas`);
const map = new CanvasMap(canvas, 200, 200);

// Add a text to the map.
CanvasMap.add(new Text({
    id: `${landmark.id}-label`,
    x: 100,
    y: 100,
    text: `Hello World`,
    fill: `rgba(0, 0, 0, 1)`,
    size: 200
}));

// Render elements to the canvas.
CanvasMap.draw();
```
