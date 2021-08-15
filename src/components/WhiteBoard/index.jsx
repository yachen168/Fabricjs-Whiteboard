import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';

import './eraserBrush';

import styles from './index.module.scss';

const chooseOptions = {
  icon: 'pi pi-fw pi-plus',
  iconOnly: false,
  className: 'custom-upload-btn p-button-info p-button-rounded p-button-outlined',
};

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

const initCanvas = () =>
  new fabric.Canvas('canvas', {
    height: 600,
    width: 800,
  });

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
    top: 50,
    left: 50,
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

const createBackgroundImage = (imageUrl, canvas) => {
  fabric.Image.fromURL(imageUrl, (img) => {
    img.scaleToWidth(canvas.width);
    img.scaleToHeight(canvas.height);
    canvas.setBackgroundImage(img);
    canvas.renderAll();
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
  alert(JSON.stringify(canvas.toJSON()));
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
  canvas.freeDrawingBrush.width = options.currentWidth;
  canvas.isDrawingMode = true;
};

const Whiteboard = () => {
  const [canvas, setCanvas] = useState(null);
  const [canvasJSON, setCanvasJSON] = useState(null);
  const fileUploadRef = useRef(null);

  useEffect(() => {
    setCanvas(() => initCanvas());
  }, []);

  useEffect(() => {
    if (canvas) {
      addCanvasEventListeners(canvas);
      canvas.loadFromJSON(canvasJSON);
      canvas.renderAll();
    }
  }, [canvas]);

  const addCanvasEventListeners = (canvas) => {
    canvas.on('mouse:up', (event) => {
      const data = JSON.stringify(canvas.toJSON());
    });
  };

  const uploadImage = (e) => {
    const reader = new FileReader();
    console.log(e);
    const file = e.files[0];

    reader.addEventListener('load', () => {
      fabric.Image.fromURL(reader.result, (img) => {
        canvas.add(img);
      });
    });

    reader.readAsDataURL(file);
  };

  const uploadPdf = () => {};

  const changeCurrentWidth = (e) => {
    options.currentWidth = parseInt(e.target.value);
    canvas.freeDrawingBrush.width = parseInt(e.target.value);
  };

  const changeCurrentColor = (e) => {
    options.currentColor = e.target.value;
    canvas.freeDrawingBrush.color = e.target.value;
  };

  return (
    <div className={styles.whiteboard}>
      <div className={styles.toolbar}>
        <Button
          label="rectangle"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => createRect(canvas, options)}
        />
        <Button
          label="circle"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => createCircle(canvas, options)}
        />
        <Button
          label="triangle"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => createTriangle(canvas, options)}
        />
        <Button
          label="image"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => createBackgroundImage('https://i.imgur.com/MFdYlTH.png', canvas)}
        />
        <Button
          label="pencil"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => draw(canvas)}
        />
        <Button
          label="eraser"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => changeToErasingMode(canvas)}
        />
        <Button
          label="text"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => createText(canvas)}
        />
        <input
          className="p-button-info p-button-rounded p-button-outlined"
          type="color"
          onChange={changeCurrentColor}
        />
        <input type="range" min={1} max={20} step={1} onChange={changeCurrentWidth} />
        <Button
          label="clear all"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => clearCanvas(canvas)}
        />
        <Button
          label="To Json"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => canvasToJson(canvas)}
        />
        <Button
          label="From Json"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => canvasFromJson(canvas)}
        />
        <FileUpload
          ref={fileUploadRef}
          multiple={false}
          name="demo[]"
          url="https://primefaces.org/primereact/showcase/upload.php"
          onUpload={uploadImage}
          accept="image/*"
          chooseOptions={chooseOptions}
          mode="basic"
          auto
          chooseLabel="Upload Image"
        />
        <FileUpload
          ref={fileUploadRef}
          multiple={false}
          name="demo[]"
          url="https://primefaces.org/primereact/showcase/upload.php"
          onUpload={uploadPdf}
          accept=".pdf"
          chooseOptions={chooseOptions}
          mode="basic"
          chooseLabel="Upload PDF"
        />
      </div>
      <canvas id="canvas" />
    </div>
  );
};

export default Whiteboard;
