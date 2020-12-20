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

addBackground is the main function that adds a background to the selected canvas and keeps rendering it. Currently there is no way to stop or pause the rendering.

It accepts one argument of type BackgroundOptions.

### BackgroundOptions

BackgroundOptions has the following properties:

| Property | Default value | Description                                                               |
| -------- | ------------- | ------------------------------------------------------------------------- |
| canvas   | `undefined`   | Canvas element to render to. **(required)**                               |
| type     | `undefined`   | Background type, currently: either 'ripples' or 'bubbles'. **(required)** |
