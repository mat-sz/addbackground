import './App.scss';
import { addBackground } from '../../src';
import { backgrounds } from '../../src/backgrounds';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const controlsType = document.getElementById('controls_type') as HTMLDivElement;

const backgroundNames = Object.keys(backgrounds);
let currentControls = addBackground({
  canvas,
  type: backgroundNames[0],
} as any);

const buttons: HTMLButtonElement[] = [];

for (const background of backgroundNames) {
  const button = document.createElement('button');
  button.innerText = background;
  button.addEventListener('click', () => {
    currentControls.stop();
    currentControls = addBackground({ canvas, type: background } as any);
    buttons.forEach(button => button.classList.remove('active'));
    button.classList.add('active');
  });

  if (background === backgroundNames[0]) {
    button.classList.add('active');
  }

  buttons.push(button);
  controlsType.appendChild(button);
}
