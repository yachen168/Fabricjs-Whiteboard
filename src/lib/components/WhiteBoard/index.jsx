import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import PdfReader from '../PdfReader';
import { saveAs } from 'file-saver';
import SelectIcon from './images/select.svg';
import EraserIcon from './images/eraser.svg';
import TextIcon from './images/text.svg';
import RectangleIcon from './images/rectangle.svg';
import LineIcon from './images/line.svg';
import EllipseIcon from './images/ellipse.svg';
import TriangleIcon from './images/triangle.svg';
import PencilIcon from './images/pencil.svg';
import DeleteIcon from './images/delete.svg';

import './eraserBrush';

import styles from './index.module.scss';

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
  ERASER: 'ERASER',
};

const initCanvas = () => {
  const canvas = new fabric.Canvas('canvas', { height: 600, width: 800 });
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.cornerStyle = 'circle';
  fabric.Object.prototype.borderColor = '#4447A9';
  fabric.Object.prototype.cornerColor = '#4447A9';
  fabric.Object.prototype.cornerSize = 6;
  fabric.Object.prototype.padding = 10;
  fabric.Object.prototype.borderDashArray = [5, 5];

  return canvas;
};

const removeObject = (canvas) => {
  return (e) => {
    if (options.currentMode === modes.ERASER) {
      canvas.remove(e.target);
    }
  };
};

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
    drawInstance.on('mousedown', removeObject(canvas));
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
      selectable: false,
    });
    drawInstance.on('mousedown', removeObject(canvas));
    canvas.add(drawInstance);

    drawInstance.on('mousedown', (e) => {
      if (options.currentMode === modes.ERASER) {
        console.log('刪除', e);
        canvas.remove(e.target);
      }
    });
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
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      cornerSize: 7,
      objectCaching: false,
      selectable: false,
    });

    drawInstance.on('mousedown', removeObject(canvas));
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
      selectable: false,
    });

    drawInstance.on('mousedown', removeObject(canvas));
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
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');
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
  if (options.currentMode !== modes.ERASER) {
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');

    options.currentMode = modes.ERASER;
    canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = options.currentWidth;
    canvas.isDrawingMode = true;
  }
};

const onSelectMode = (canvas) => {
  options.currentMode = '';
  canvas.isDrawingMode = false;

  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');

  canvas.getObjects().map((item) => item.set({ selectable: true }));
  canvas.hoverCursor = 'all-scroll';
};

const clearCanvas = (canvas) => {
  canvas.getObjects().forEach((item) => {
    if (item !== canvas.backgroundImage) {
      canvas.remove(item);
    }
  });
};

const canvasToJson = (canvas) => {
  alert(JSON.stringify(canvas.toJSON()));
};

const draw = (canvas) => {
  if (options.currentMode !== modes.PENCIL) {
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
    canvas.off('path:created');
    canvas.on('path:created', (e) => {
      e.path.on('mousedown', removeObject(canvas));
    });

    options.currentMode = modes.PENCIL;
    canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = parseInt(options.currentWidth, 10) || 1;
    canvas.isDrawingMode = true;
  }
};

const Whiteboard = () => {
  const [canvas, setCanvas] = useState(null);
  const [canvasJSON, setCanvasJSON] = useState(null);
  const [brushWidth, setBrushWidth] = useState(5);
  const [isFill, setIsFill] = useState(false);
  const [fileReaderInfo, setFileReaderInfo] = useState({
    file: '',
    totalPages: null,
    currentPageNumber: 1,
    currentPage: '',
  });
  const canvasRef = useRef(null);
  const menuRef = useRef(null);
  const uploadImageRef = useRef(null);
  const uploadPdfRef = useRef(null);

  const items = [
    {
      label: 'Image',
      icon: 'pi pi-image',
      command: () => {
        console.log('uploadImageRef');
        uploadImageRef.current.click();
      },
    },
    {
      label: 'PDF',
      icon: 'pi pi-file-pdf',
      command: () => {
        uploadPdfRef.current.click();
      },
    },
  ];

  useEffect(() => {
    setCanvas(() => initCanvas());
  }, []);

  useEffect(() => {
    if (canvas) {
      const center = canvas.getCenter();
      fabric.Image.fromURL(fileReaderInfo.currentPage, (img) => {
        img.scaleToHeight(canvas.height);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          top: center.top,
          left: center.left,
          originX: 'center',
          originY: 'center',
        });

        canvas.renderAll();
      });
    }
  }, [fileReaderInfo.currentPage]);

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
    const file = e.target.files[0];

    reader.addEventListener('load', () => {
      fabric.Image.fromURL(reader.result, (img) => {
        img.scaleToHeight(canvas.height);
        canvas.add(img);
      });
    });

    reader.readAsDataURL(file);
  };

  const changeCurrentWidth = (e) => {
    const intValue = parseInt(e.target.value);
    options.currentWidth = intValue;
    canvas.freeDrawingBrush.width = intValue;
    setBrushWidth(() => intValue);
  };

  const changeCurrentColor = (e) => {
    options.currentColor = e.target.value;
    canvas.freeDrawingBrush.color = e.target.value;
  };

  const changeFill = (e) => {
    options.fill = e.target.checked;
    setIsFill(() => e.target.checked);
  };

  const onSaveCanvasAsImage = () => {
    canvasRef.current.toBlob(function (blob) {
      saveAs(blob, 'image.png');
    });
  };

  const onFileChange = (event) => {
    updateFileReaderInfo({ file: event.target.files[0], currentPageNumber: 1 });
  };

  const updateFileReaderInfo = (data) => {
    setFileReaderInfo({ ...fileReaderInfo, ...data });
  };

  return (
    <div className={styles.whiteboard}>
      <div className={styles.toolbar}>
        <button type="button" onClick={() => createLine(canvas)}>
          <img src={LineIcon} alt="line" />
        </button>
        <button type="button" onClick={() => createRect(canvas)}>
          <img src={RectangleIcon} alt="Rectangle" />
        </button>
        <button type="button" onClick={() => createEllipse(canvas)}>
          <img src={EllipseIcon} alt="Ellipse" />
        </button>
        <button type="button" onClick={() => createTriangle(canvas, options)}>
          <img src={TriangleIcon} alt="Triangle" />
        </button>
        <button type="button" onClick={() => draw(canvas)}>
          <img src={PencilIcon} alt="Pencil" />
        </button>
        <button type="button" onClick={() => createText(canvas)}>
          <img src={TextIcon} alt="Text" />
        </button>
        <button type="button" onClick={() => onSelectMode(canvas)}>
          <img src={SelectIcon} alt="Selection mode" />
        </button>
        <button type="button" onClick={() => changeToErasingMode(canvas)}>
          <img src={EraserIcon} alt="Eraser" />
        </button>
        <button type="button" onClick={() => clearCanvas(canvas)}>
          <img src={DeleteIcon} alt="Delete" />
        </button>
        <div>
          <input type="checkbox" name="fill" id="fill" checked={isFill} onChange={changeFill} />
          <label htmlFor="fill">fill</label>
        </div>
        <div>
          <input type="color" name="color" id="color" onChange={changeCurrentColor} />
        </div>
        <input
          type="range"
          min={1}
          max={20}
          step={1}
          value={brushWidth}
          onChange={changeCurrentWidth}
        />
        <div className="uploadInput">
          <label htmlFor="uploadImage">+Image</label>
          <input ref={uploadImageRef} accept="image/*" type="file" onChange={uploadImage} />
        </div>
        <div className="uploadInput">
          <label htmlFor="uploadPDF">+PDF</label>
          <input ref={uploadPdfRef} accept=".pdf" type="file" onChange={onFileChange} />
        </div>

        <button onClick={() => canvasToJson(canvas)}>To Json</button>
        <button onClick={onSaveCanvasAsImage}>save as image</button>
      </div>
      <canvas ref={canvasRef} id="canvas" />
      <div>
        <PdfReader fileReaderInfo={fileReaderInfo} updateFileReaderInfo={updateFileReaderInfo} />
      </div>
    </div>
  );
};

export default Whiteboard;
