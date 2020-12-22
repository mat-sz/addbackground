import './App.scss';
import { addBackground } from '../../src';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
addBackground({ canvas, type: 'triangles' });
