import * as twgl from 'twgl.js';
import fs from './fs.js';
import vs from './vs.js';

let timestamp = Date.now();
setInterval(function() {
}, 100);

const gl = document.querySelector('canvas').getContext('webgl');
const programInfo = twgl.createProgramInfo(gl, [vs, fs]);

const arrays = {
  position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);

const render = dt => {
  //graphics(game);
  twgl.resizeCanvasToDisplaySize(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const uniforms = {
    time: dt * 0.001,
    resolution: [gl.canvas.width, gl.canvas.height],
  };
  gl.useProgram(programInfo.program);
  twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
  twgl.setUniforms(programInfo, uniforms);
  twgl.drawBufferInfo(gl, bufferInfo);

  window.requestAnimationFrame(render);
};
window.requestAnimationFrame(render);

// Idea: have a separate raf loop for animations, that updates animation values, prob called before draw function
