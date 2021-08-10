import React from 'react';
import { fabric } from 'fabric';
import './eraserBrush';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';

import styles from './app.module.scss';

const options = {
  currentMode: '',
  currentColor: '#000000',
  currentWidth: 5,
  group: {},
};

const modes = {
  pan: 'pan',
  drawing: 'drawing',
};

const createBackgroundImage = (url, canvas) => {
  fabric.Image.fromURL(
    url,
    (img) => {
      // img.scale(0.3);
      canvas.add(img);
    },
    {
      top: 0,
      left: 0,
      cornerSize: 7,
    }
  );
  canvas.requestRenderAll();
};

const createRect = (canvas, options) => {
  const rect = new fabric.Rect({
    top: 100,
    left: 100,
    width: 60,
    height: 70,
    fill: options.currentColor,
    objectCaching: false,
    erasable: true,
  });

  rect.on('selected', (data) => {
    console.log('選中了', data);
  });

  canvas.add(rect);
  canvas.requestRenderAll();
};

const createCircle = (canvas, options) => {
  const circle = new fabric.Circle({
    top: 200,
    left: 200,
    radius: 50,
    fill: options.currentColor,
    cornerSize: 7,
    objectCaching: false,
  });

  canvas.add(circle);
  canvas.requestRenderAll();
};

const createTriangle = (canvas, options) => {
  canvas.isDrawingMode = false;
  const triangle = new fabric.Triangle({
    top: 400,
    left: 300,
    width: 50,
    height: 70,
    fill: options.currentColor,
    cornerSize: 7,
    objectCaching: false,
  });

  canvas.add(triangle);
  canvas.requestRenderAll();
};

const createText = (canvas) => {
  canvas.isDrawingMode = false;
  const text = new fabric.Textbox('text', {
    left: 100,
    top: 100,
    fill: options.currentColor,
    editable: true,
  });

  canvas.add(text);
  canvas.renderAll();
};

const changeToErasingMode = (canvas) => {
  canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
  canvas.freeDrawingBrush.width = options.currentWidth;
  canvas.isDrawingMode = true;
};

const clearCanvas = (canvas) => {
  canvas.getObjects().forEach((item) => {
    if (item !== canvas.backgroundImage) {
      canvas.remove(item);
    }
  });
};

const canvasFromJson = (canvas) => {
  const data = JSON.parse(
    '{"version":"4.3.1","objects":[{"type":"circle","version":"4.3.1","originX":"left","originY":"top","left":100,"top":100,"width":40,"height":40,"fill":"rgba(255, 255, 255, 0.0)","stroke":"#000000","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"radius":20,"startAngle":0,"endAngle":6.283185307179586},{"type":"text","version":"4.3.1","originX":"left","originY":"top","left":253,"top":102,"width":95.55,"height":18.08,"fill":"#000000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":2.43,"scaleY":2.43,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"text":"Some text","fontSize":16,"fontWeight":"normal","fontFamily":"Arial","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"minWidth":20,"splitByGrapheme":false,"styles":{}},{"type":"rect","version":"4.3.1","originX":"left","originY":"top","left":109,"top":212,"width":40,"height":40,"fill":"rgba(255, 255, 255, 0.0)","stroke":"#000000","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"image","version":"4.3.1","originX":"left","originY":"top","left":499,"top":86,"width":1200,"height":900,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.2,"scaleY":0.2,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg","crossOrigin":null,"filters":[]},{"type":"polyline","version":"4.3.1","originX":"left","originY":"top","left":483.78,"top":339.22,"width":50.88,"height":50.88,"fill":"white","stroke":"black","strokeWidth":2,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":262.52,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"points":[{"x":100,"y":100},{"x":99.11611652351681,"y":100.88388347648318},{"x":145.58058261758407,"y":147.34834957055045},{"x":142.92893218813452,"y":150},{"x":150,"y":150},{"x":150,"y":142.92893218813452},{"x":147.34834957055045,"y":145.58058261758407},{"x":100.88388347648318,"y":99.11611652351681},{"x":100,"y":100}]},{"type":"image","version":"4.3.1","originX":"left","originY":"top","left":197,"top":132,"width":1200,"height":900,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.2,"scaleY":0.2,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg","crossOrigin":null,"filters":[]}]}'
  );
  canvas.loadFromJSON(data);
  canvas.requestRenderAll();
};

const canvasToJson = (canvas) => {
  console.log(JSON.stringify(canvas.toJSON()));
};

const groupObjects = (canvas, options, shouldGroup) => {
  if (shouldGroup) {
    const objects = canvas.getObjects();
    options.group.value = new fabric.Group(objects);
    clearCanvas(canvas); // 先清除先前的，否則會重複出現兩組

    canvas.add(options.group.value);
  } else {
    if (options.group.value) {
      options.group.value.destroy();
      const oldGroup = options.group.value.getObjects();
      canvas.remove(options.group.value);
      canvas.add(...oldGroup);
      options.group.value = null;
      canvas.requestRenderAll();
    }
  }
};

const toggleMode = (mode, canvas) => {
  if (options.currentMode === modes[mode]) {
    options.currentMode = '';
  } else {
    options.currentMode = modes[mode];

    if (mode === modes.drawing) {
      canvas.isDrawingMode = true;
    }
  }
};

const draw = (canvas) => {
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
  canvas.freeDrawingBrush.width = 10;
  canvas.isDrawingMode = true;
};

const App = () => {
  const { editor, onReady } = useFabricJSEditor();

  const uploadImage = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.addEventListener('load', () => {
      fabric.Image.fromURL(reader.result, (img) => {
        editor.canvas.add(img);
      });
    });

    reader.readAsDataURL(file);
  };

  const changeCurrentWidth = (e) => {
    options.currentWidth = e.target.value;
    editor.canvas.freeDrawingBrush.width = parseInt(e.target.value);
  };

  const changeCurrentColor = (e) => {
    options.currentColor = e.target.value;
    editor.canvas.freeDrawingBrush.color = e.target.value;
  };

  return (
    <div className={styles.app}>
      <button onClick={() => createRect(editor.canvas, options)}>rectangle</button>
      <button onClick={() => createCircle(editor.canvas, options)}>circle</button>
      <button onClick={() => createTriangle(editor.canvas, options)}>triangle</button>
      <button
        onClick={() => createBackgroundImage('https://i.imgur.com/MFdYlTH.png', editor.canvas)}
      >
        image
      </button>
      <button onClick={() => draw(editor.canvas)}>pencil</button>
      <button onClick={() => changeToErasingMode(editor.canvas)}>eraser</button>
      <button onClick={() => createText(editor.canvas)}>text</button>
      <input type="color" onChange={changeCurrentColor} />
      <input type="range" min={1} max={20} onChange={changeCurrentWidth} />
      <button onClick={() => clearCanvas(editor.canvas)}>clear all</button>
      <button onClick={() => groupObjects(editor.canvas, options, true)}>group all objects</button>
      <button onClick={() => groupObjects(editor.canvas, options, false)}>ungroup</button>

      <button onClick={() => canvasToJson(editor.canvas)}>toJson</button>
      <button onClick={() => canvasFromJson(editor.canvas)}>fromJson</button>
      <input type="file" accept="image/*" onChange={uploadImage} />
      <FabricJSCanvas className={styles.canvas} onReady={onReady} />
    </div>
  );
};

export default App;
