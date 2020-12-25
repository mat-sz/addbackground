<h1 align="center">addbackground</h1>

<p align="center">
Beautiful canvas backgrounds made easy.
</p>

<p align="center">
<a href="https://npmjs.com/package/addbackground">
<img alt="npm" src="https://img.shields.io/npm/v/addbackground">
<img alt="npm" src="https://img.shields.io/npm/dw/addbackground">
<img alt="NPM" src="https://img.shields.io/npm/l/addbackground">
</a>
</p>

## Installation

TypeSocket is available on [npm](https://www.npmjs.com/package/addbackground), you can install it with either npm or yarn:

```sh
npm install addbackground
# or:
yarn install addbackground
```

## Example usage

```ts
import { addBackground } from 'addbackground';

const canvas = document.getElementById('backgroundCanvas');
addBackground({ canvas, type: 'bubbles' });
```

## API

### addBackground

addBackground is the main function that adds a background to the selected canvas and keeps rendering it.

It accepts one argument of type `BackgroundOptions` and returns an instance of `BackgroundControls`.

### BackgroundOptions

BackgroundOptions is an object that has the following properties:

| Property            | Default value              | Description                                                                                                     |
| ------------------- | -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| canvas              | `undefined`                | Canvas element to render to. **(required)**                                                                     |
| type                | `undefined`                | Background type, currently: either 'ripples' or 'bubbles'. **(required)**                                       |
| primaryColor        | `rgba(255, 255, 255, 0.2)` | Primary color, accepts a [CSS <color> value.](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).    |
| secondaryColor      | `rgba(0, 0, 0, 0.2)`       | Secondary color, accepts a [CSS <color> value.](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value).  |
| backgroundColor     | `transparent`              | Background color, accepts a [CSS <color> value.](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value). |
| mouseEffectsEnabled | `true`                     | Should mouse effects be enabled.                                                                                |

### BackgroundControls

#### isPlaying: boolean

Returns the playback state of the animation.

#### setIsPlaying: (value: boolean) => void

Sets the playback state of the animation.

#### stop: () => void

Disassembles the animation, clears the canvas. Further playback is impossible after this function is called.
