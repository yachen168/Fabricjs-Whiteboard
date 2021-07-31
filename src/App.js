import React, { useEffect, useState } from "react";
import { fabric } from "fabric";

import styles from "./app.module.scss";

let isMousePressed = false;
let currentMode;
let currentColor = "#000000";
let currentWidth = 1;
let group = {};

const initCanvas = () =>
  new fabric.Canvas("canvas", {
    height: 500,
    width: 500,
    selection: false,
  });

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

function createRect(canvas) {
  const rect = new fabric.Rect({
    top: 100,
    left: 100,
    width: 60,
    height: 70,
    fill: currentColor,
    objectCaching: false,
  });

  rect.on("selected", (data) => {
    console.log("選中了", data);
  });

  canvas.add(rect);
  canvas.requestRenderAll();
}

function createCircle(canvas) {
  const circle = new fabric.Circle({
    top: 200,
    left: 200,
    radius: 50,
    fill: currentColor,
    cornerSize: 7,
    objectCaching: false,
  });

  canvas.add(circle);
  canvas.requestRenderAll();
}

function createTriangle(canvas) {
  const triangle = new fabric.Triangle({
    top: 400,
    left: 300,
    width: 50,
    height: 70,
    fill: currentColor,
    cornerSize: 7,
    objectCaching: false,
  });

  canvas.add(triangle);
  canvas.requestRenderAll();
}

const addCanvasEventListeners = (canvas) => {
  canvas.on("mouse:down", (event) => {
    isMousePressed = true;

    if (currentMode === "pencil") {
      canvas.setCursor("crosshair");
      canvas.requestRenderAll();
    }
  });

  canvas.on("mouse:move", (event) => {
    if (isMousePressed && currentMode === "pencil") {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = currentColor;
      canvas.freeDrawingBrush.width = currentWidth;

      canvas.requestRenderAll();
    }
  });

  canvas.on("mouse:up", (event) => {
    isMousePressed = false;
    canvas.setCursor("default");
    canvas.requestRenderAll();
  });
};

const toggleMode = (mode) => {
  currentMode = mode;
};

const clearCanvas = (canvas) => {
  canvas.getObjects().forEach((item) => {
    if (item !== canvas.backgroundImage) {
      canvas.remove(item);
    }
  });
};

const groupObjects = (canvas, group, shouldGroup) => {
  if (shouldGroup) {
    const objects = canvas.getObjects();
    group.value = new fabric.Group(objects);
    clearCanvas(canvas); // 先清除先前的，否則會重複出現兩組

    canvas.add(group.value);
  } else {
    if (group.value) {
      group.value.destroy();
      const oldGroup = group.value.getObjects();
      canvas.remove(group.value);
      canvas.add(...oldGroup);
      group.value = null;
      canvas.requestRenderAll();
    }
  }
};

const App = () => {
  const [canvas, setCanvas] = useState("");
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    if (canvas) {
      addCanvasEventListeners(canvas);
    }
  }, [canvas]);

  return (
    <div className={styles.app}>
      <button onClick={() => createRect(canvas)}>rectangle</button>
      <button onClick={() => createCircle(canvas)}>circle</button>
      <button onClick={() => createTriangle(canvas)}>triangle</button>
      <button
        onClick={() =>
          createBackgroundImage("https://i.imgur.com/MFdYlTH.png", canvas)
        }
      >
        image
      </button>
      <button onClick={() => toggleMode("pencil")}>pencil</button>
      <input type="color" onChange={(e) => (currentColor = e.target.value)} />
      <input
        type="range"
        min={1}
        max={20}
        onChange={(e) => (currentWidth = e.target.value)}
      />
      <button onClick={() => clearCanvas(canvas)}>clear all</button>
      <button onClick={() => groupObjects(canvas, group, true)}>
        group all objects
      </button>
      <button onClick={() => groupObjects(canvas, group, false)}>
        ungroup
      </button>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default App;
