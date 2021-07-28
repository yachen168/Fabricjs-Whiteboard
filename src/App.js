import React, { useEffect, useState } from "react";
import { fabric } from "fabric";
// import testImage from "./images/test.jpeg";

import styles from "./app.module.scss";

const initCanvas = () =>
  new fabric.Canvas("canvas", {
    height: 800,
    width: 800,
    backgroundColor: "pink",
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

// const path = new fabric.Path("M 10 10 L 20 120 L 170 200 z");
// path.set({ left: 300, top: 30, fill: "purple" });

// fabric.Image.fromURL(
//   "./images/test.jpeg",
//   (img) => {
//     img.scale(0.1);
//     canvas.add(img);
//   },
//   {
//     top: 100,
//     left: 100,
//     width: 100,
//     height: 100,
//   }
// );
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

      <canvas id="canvas"></canvas>
    </div>
  );
};

export default App;
