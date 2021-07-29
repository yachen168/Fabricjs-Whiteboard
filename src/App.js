import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
// import testImage from "./images/test.jpeg";

import styles from "./app.module.scss";

const initCanvas = () =>
  new fabric.Canvas("canvas", {
    height: 800,
    width: 800,
    // backgroundColor: "pink",
  });
const rect = new fabric.Rect({
  top: 100,
  left: 100,
  width: 60,
  height: 70,
  fill: "blue",
});

const circle = new fabric.Circle({
  top: 200,
  left: 200,
  radius: 50,
  fill: "green",
});

const triangle = new fabric.Triangle({
  top: 400,
  left: 300,
  width: 50,
  height: 70,
  fill: "orange",
});

const setBackgroundImage = (url, canvas) => {
  fabric.Image.fromURL(
    url,
    (img) => {
      // img.scale(0.3);
      canvas.add(img);
    },
    {
      top: 0,
      left: 0,
    }
  );
};

const App = () => {
  const [canvas, setCanvas] = useState("");
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  return (
    <div className={styles.app}>
      <button onClick={() => canvas.add(rect)}>rectangle</button>
      <button onClick={() => canvas.add(circle)}>circle</button>
      <button onClick={() => canvas.add(triangle)}>triangle</button>
      <button
        onClick={() =>
          setBackgroundImage(
            "https://lh3.googleusercontent.com/proxy/7WAFFrrvSi0t3JENHp1Y5MUDSFXOu7SyLsFZRCG-yyg79igz8IEudYy7JVVY6s-hs9p1MGdVWHcD4qZFJQizfm_2eubPUv-2SYqVcOj6jqB9M5c4IeXDqFrw5k5D",
            canvas
          )
        }
      >
        triangle
      </button>

      <canvas id="canvas"></canvas>
    </div>
  );
};

export default App;
