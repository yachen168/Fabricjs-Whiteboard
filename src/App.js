import React, { useEffect, useState } from "react";
import { fabric } from "fabric";

import styles from "./app.module.scss";

let isMousePressed = false;
let currentMode;
let currentColor = "#000000";
let currentWidth = 1;

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
  canvas.renderAll();
};

function createRect(canvas) {
  const rect = new fabric.Rect({
    top: 100,
    left: 100,
    width: 60,
    height: 70,
    fill: currentColor,
  });

  rect.on("selected", (data) => {
    console.log("選中了", data);
  });

  canvas.add(rect);
  canvas.renderAll();
}

function createCircle(canvas) {
  const circle = new fabric.Circle({
    top: 200,
    left: 200,
    radius: 50,
    fill: currentColor,
    cornerSize: 7,
  });

  canvas.add(circle);
  canvas.renderAll();
}

function createTriangle(canvas) {
  const triangle = new fabric.Triangle({
    top: 400,
    left: 300,
    width: 50,
    height: 70,
    fill: currentColor,
    cornerSize: 7,
  });

  canvas.add(triangle);
  canvas.renderAll();
}

const addCanvasEventListeners = (canvas) => {
  canvas.on("mouse:down", (event) => {
    isMousePressed = true;

    if (currentMode === "pencil") {
      canvas.setCursor("crosshair");
      canvas.renderAll();
    }
  });

  canvas.on("mouse:move", (event) => {
    if (isMousePressed && currentMode === "pencil") {
      canvas.freeDrawingBrush.color = currentColor;
      canvas.freeDrawingBrush.width = currentWidth;

      canvas.isDrawingMode = true;
      canvas.renderAll();
    }
  });

  canvas.on("mouse:up", (event) => {
    isMousePressed = false;
    canvas.setCursor("default");
    canvas.renderAll();
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
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default App;
