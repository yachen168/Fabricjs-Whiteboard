"use strict";

exports.__esModule = true;
exports.drawingMode = exports.defaultTriangleOptions = exports.defaultRectOptions = exports.defaultLineOptions = exports.defaultEllipseOptions = void 0;
var drawingMode = {
  RECTANGLE: 'RECTANGLE',
  ELLIPSE: 'ELLIPSE',
  TRIANGLE: 'TRIANGLE',
  LINE: 'LINE',
  ERASER: 'ERASER'
};
exports.drawingMode = drawingMode;
var defaultRectOptions = {
  strokeWidth: 2,
  stroke: 'black',
  fill: 'transparent',
  strokeUniform: true,
  noScaleCache: false,
  objectCaching: false
};
exports.defaultRectOptions = defaultRectOptions;
var defaultEllipseOptions = {
  strokeWidth: 2,
  stroke: 'black',
  fill: 'black',
  strokeUniform: true,
  noScaleCache: false
};
exports.defaultEllipseOptions = defaultEllipseOptions;
var defaultTriangleOptions = {
  strokeWidth: 2,
  stroke: 'black',
  fill: 'black',
  strokeUniform: true,
  noScaleCache: false
};
exports.defaultTriangleOptions = defaultTriangleOptions;
var defaultLineOptions = {
  strokeWidth: 2,
  stroke: 'black',
  fill: 'black',
  strokeUniform: true,
  noScaleCache: false
};
exports.defaultLineOptions = defaultLineOptions;