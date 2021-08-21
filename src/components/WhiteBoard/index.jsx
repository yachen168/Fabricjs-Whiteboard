import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

import './eraserBrush';

import styles from './index.module.scss';

const chooseOptions = {
  icon: 'pi pi-fw pi-plus',
  iconOnly: false,
  className: 'custom-upload-btn p-button-info p-button-rounded p-button-outlined',
};

let drawInstance = null;
let origX;
let origY;
let mouseDown = false;

const options = {
  currentMode: '',
  currentColor: '#000000',
  currentWidth: 5,
  fill: false,
  group: {},
};

const modes = {
  RECTANGLE: 'RECTANGLE',
  TRIANGLE: 'TRIANGLE',
  ELLIPSE: 'ELLIPSE',
  LINE: 'LINE',
  PENCIL: 'PENCIL',
};

const initCanvas = () =>
  new fabric.Canvas('canvas', {
    height: 600,
    width: 800,
  });

/*  ==== line  ==== */
const createLine = (canvas) => {
  if (modes.currentMode !== modes.LINE) {
    options.currentMode = modes.LINE;

    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    canvas.on('mouse:down', startAddLine(canvas));
    canvas.on('mouse:move', startDrawingLine(canvas));
    canvas.on('mouse:up', stopDrawingLine);

    canvas.selection = false;
    canvas.hoverCursor = 'auto';
    canvas.isDrawingMode = false;
    canvas.getObjects().map((item) => item.set({ selectable: false }));
    canvas.discardActiveObject().requestRenderAll();
  }
};

const startAddLine = (canvas) => {
  return ({ e }) => {
    mouseDown = true;

    let pointer = canvas.getPointer(e);
    drawInstance = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
      strokeWidth: options.currentWidth,
      stroke: options.currentColor,
      selectable: false,
    });

    canvas.add(drawInstance);
    canvas.requestRenderAll();
  };
};

const startDrawingLine = (canvas) => {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e);
      drawInstance.set({
        x2: pointer.x,
        y2: pointer.y,
      });
      drawInstance.setCoords();
      canvas.requestRenderAll();
    }
  };
};
const stopDrawingLine = () => {
  mouseDown = false;
};

/* ==== rectangle ==== */
const createRect = (canvas) => {
  if (options.currentMode !== modes.RECTANGLE) {
    options.currentMode = modes.RECTANGLE;

    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    canvas.on('mouse:down', startAddRect(canvas));
    canvas.on('mouse:move', startDrawingRect(canvas));
    canvas.on('mouse:up', stopDrawingRect);

    canvas.selection = false;
    canvas.hoverCursor = 'auto';
    canvas.isDrawingMode = false;
    canvas.getObjects().map((item) => item.set({ selectable: false }));
    canvas.discardActiveObject().requestRenderAll();
  }
};

const startAddRect = (canvas) => {
  return ({ e }) => {
    mouseDown = true;

    const pointer = canvas.getPointer(e);
    origX = pointer.x;
    origY = pointer.y;

    drawInstance = new fabric.Rect({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      width: 0,
      height: 0,
      selectionBackgroundColor: 'rgba(245, 245, 220, 0.5)',
      selectable: false,
    });

    canvas.add(drawInstance);
  };
};

const startDrawingRect = (canvas) => {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e);

      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x);
      }
      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y);
      }
      drawInstance.set({
        width: Math.abs(pointer.x - origX),
        height: Math.abs(pointer.y - origY),
      });
      drawInstance.setCoords();
      canvas.renderAll();
    }
  };
};

const stopDrawingRect = () => {
  mouseDown = false;
};

/* ==== Ellipse ==== */
const createEllipse = (canvas) => {
  if (options.currentMode !== modes.ELLIPSE) {
    options.currentMode = modes.ELLIPSE;

    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    canvas.on('mouse:down', startAddEllipse(canvas));
    canvas.on('mouse:move', startDrawingEllipse(canvas));
    canvas.on('mouse:up', stopDrawingEllipse);

    canvas.selection = false;
    canvas.hoverCursor = 'auto';
    canvas.isDrawingMode = false;
    canvas.getObjects().map((item) => item.set({ selectable: false }));
    canvas.discardActiveObject().requestRenderAll();
  }
};

const startAddEllipse = (canvas) => {
  return ({ e }) => {
    mouseDown = true;

    const pointer = canvas.getPointer(e);
    origX = pointer.x;
    origY = pointer.y;
    drawInstance = new fabric.Ellipse({
      stroke: 'black',
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      cornerSize: 7,
      objectCaching: false,
      selectionBackgroundColor: 'rgba(245, 245, 220, 0.5)',
      selectable: false,
    });

    canvas.add(drawInstance);
  };
};

const startDrawingEllipse = (canvas) => {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e);
      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x);
      }
      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y);
      }
      drawInstance.set({
        rx: Math.abs(pointer.x - origX) / 2,
        ry: Math.abs(pointer.y - origY) / 2,
      });
      drawInstance.setCoords();
      canvas.renderAll();
    }
  };
};

const stopDrawingEllipse = () => {
  mouseDown = false;
};

/* === triangle === */
const createTriangle = (canvas) => {
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');

  canvas.on('mouse:down', startAddTriangle(canvas));
  canvas.on('mouse:move', startDrawingTriangle(canvas));
  canvas.on('mouse:up', stopDrawingTriangle);

  canvas.selection = false;
  canvas.hoverCursor = 'auto';
  canvas.isDrawingMode = false;
  canvas.getObjects().map((item) => item.set({ selectable: false }));
  canvas.discardActiveObject().requestRenderAll();
};

const startAddTriangle = (canvas) => {
  return ({ e }) => {
    mouseDown = true;
    options.currentMode = modes.TRIANGLE;

    const pointer = canvas.getPointer(e);
    origX = pointer.x;
    origY = pointer.y;
    drawInstance = new fabric.Triangle({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      width: 0,
      height: 0,
      selectionBackgroundColor: 'rgba(245, 245, 220, 0.5)',
      selectable: false,
    });

    canvas.add(drawInstance);
  };
};

const startDrawingTriangle = (canvas) => {
  return ({ e }) => {
    if (mouseDown) {
      const pointer = canvas.getPointer(e);
      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x);
      }
      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y);
      }
      drawInstance.set({
        width: Math.abs(pointer.x - origX),
        height: Math.abs(pointer.y - origY),
      });
      drawInstance.setCoords();
      canvas.renderAll();
    }
  };
};

const stopDrawingTriangle = () => {
  mouseDown = false;
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

const draw = (canvas) => {
  if (options.currentMode !== modes.PENCIL) {
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    options.currentMode = modes.PENCIL;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = options.currentWidth;
    canvas.isDrawingMode = true;
  }
};

const Whiteboard = () => {
  const [canvas, setCanvas] = useState(null);
  const [canvasJSON, setCanvasJSON] = useState(null);
  const [isFill, setIsFill] = useState(false);
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

  const changeFill = (e) => {
    console.log(e);
    options.fill = e.checked;
    setIsFill(() => e.checked);
  };

  return (
    <div className={styles.whiteboard}>
      <div className={styles.toolbar}>
        <Button
          label="line"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => createLine(canvas)}
        />
        <Button
          label="rectangle"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => createRect(canvas)}
        />
        <Button
          label="ellipse"
          className="p-button-info p-button-rounded p-button-outlined"
          onClick={() => createEllipse(canvas)}
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
        <Checkbox id="fill" checked={isFill} onChange={changeFill} />
        <label htmlFor="fill">fill</label>
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
