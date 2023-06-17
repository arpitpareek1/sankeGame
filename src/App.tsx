import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { stateObject } from "./interface";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// export function debounce<T extends any[]>(
//   func: (...args: T) => void,
//   delay: number
// ): DebouncedFunction<T> {
//   let timerId: ReturnType<typeof setTimeout>;
//   return function debounced(...args: T) {
//     clearTimeout(timerId);
//     timerId = setTimeout(() => {
//       func(...args);
//     }, delay);
//   };
// }

function debounceCutm(fun: () => void, delay: number) {
  let timerId;
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    fun();
  }, delay);
}

function App() {
  const pointerXY = useRef<stateObject>({
    x: 0,
    y: 0,
  });
  const snakeCodi = useRef<stateObject>({
    x: 0,
    y: 0,
  });

  const togo = useRef<String>("left");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctx = useRef<CanvasRenderingContext2D | undefined | null>(null);
  const score = useRef<number>(0);

  const [scoreState, setScoreState] = useState<number>(0);

  useEffect(() => {
    pointerXY.current.x = Math.floor(Math.random() * 690) + 5;
    pointerXY.current.y = Math.floor(Math.random() * 490) + 5;
    if (score.current > 0) {
      setScoreState(scoreState + 1);
    }
  }, [score.current]);

  window.addEventListener("keydown", (key) => {
    let keyy = key.keyCode;
    switch (keyy) {
      case (keyy = 40):
        if (togo.current !== "down") {
          togo.current = "up";
        }
        break;
      case (keyy = 39):
        if (togo.current !== "right") {
          togo.current = "left";
        }
        break;
      case (keyy = 38):
        if (togo.current !== "up") {
          togo.current = "down";
        }
        break;
      case (keyy = 37):
        if (togo.current !== "left") {
          togo.current = "right";
        }
        break;
    }
  });

  function drawRoundedRect(
    pointx: number,
    pointy: number,
    width: number,
    height: number,
    radius: number
  ) {
    ctx.current?.beginPath();
    ctx.current?.moveTo(pointx + radius, pointy);
    ctx.current?.lineTo(pointx + width - radius, pointy);
    ctx.current?.arcTo(pointx + width, pointy, pointx + width, pointy + radius, radius);
    ctx.current?.lineTo(pointx + width, pointy + height - radius);
    ctx.current?.arcTo(
      pointx + width,
      pointy + height,
      pointx + width - radius,
      pointy + height,
      radius
    );
    ctx.current?.lineTo(pointx + radius, pointy + height);
    ctx.current?.arcTo(pointx, pointy + height, pointx, pointy + height - radius, radius);
    ctx.current?.lineTo(pointx, pointy + radius);
    ctx.current?.arcTo(pointx, pointy, pointx + radius, pointy, radius);
    ctx.current?.closePath();
    if (ctx.current && ctx.current.fillStyle) {
      ctx.current.fillStyle = "black";
    }
    ctx.current?.fill();
  }

  const CanvasComponent = () => {
    let x = snakeCodi.current.x;
    let y = snakeCodi.current.y;
    let width = 40;
    let height = 15;
    const color = "black";

    useEffect(() => {
      const canvas = canvasRef.current;
      ctx.current = canvas?.getContext("2d");
    }, [canvasRef.current]);

    useEffect(() => {
      animate();
    }, [togo.current]);

    async function animate() {
      await sleep(10);
      if (ctx.current) {
        const canvas = canvasRef.current;
        ctx.current?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
        drawRoundedRect(pointerXY.current.x, pointerXY.current.y, 20, 20, 20);
        switch (togo.current) {
          case "left":
            width = 40;
            height = 15;
            if (x >= 700) {
              x = x - 700;
            } else if (y >= 500) {
              y = y - 500;
            } else {
              x += 2;
            }
            break;
          case "right":
            width = 40;
            height = 15;
            if (x <= 0) {
              x = 700;
            } else if (y <= 0) {
              y = 500;
            } else {
              x -= 2;
            }
            break;
          case "up":
            height = 40;
            width = 15;
            if (x >= 700) {
              x = x - 700;
            } else if (y >= 500) {
              y = y - 500;
            } else {
              y += 2;
            }
            break;
          case "down":
            height = 40;
            width = 15;
            if (x <= 0) {
              x = 700;
            } else if (y <= 0) {
              y = 500;
            } else {
              y -= 2;
            }
            break;
        }

        if (ctx.current && ctx.current.fillStyle) {
          ctx.current.fillStyle = color;
        }

        let checkforX =
          x === pointerXY.current.x ||
          x === pointerXY.current.x + 1 ||
          x === pointerXY.current.x + 2 ||
          x === pointerXY.current.x + 3 ||
          x === pointerXY.current.x + 4 ||
          x === pointerXY.current.x + 5 ||
          x === pointerXY.current.x + 6 ||
          x === pointerXY.current.x - 1 ||
          x === pointerXY.current.x - 2 ||
          x === pointerXY.current.x - 4 ||
          x === pointerXY.current.x - 5 ||
          x === pointerXY.current.x - 6 ||
          x === pointerXY.current.x - 3;

        let checkforY =
          y === pointerXY.current.y ||
          y === pointerXY.current.y + 1 ||
          y === pointerXY.current.y + 2 ||
          y === pointerXY.current.y + 3 ||
          y === pointerXY.current.y + 4 ||
          y === pointerXY.current.y + 5 ||
          y === pointerXY.current.y + 6 ||
          y === pointerXY.current.y - 1 ||
          y === pointerXY.current.y - 2 ||
          y === pointerXY.current.y - 4 ||
          y === pointerXY.current.y - 5 ||
          y === pointerXY.current.y - 6 ||
          y === pointerXY.current.y - 3;

        if (
          checkforX &&
          checkforY &&
          pointerXY.current.x !== 0 &&
          pointerXY.current.y !== 0 &&
          x !== 0 &&
          y !== 0
        ) {
          score.current = score.current + 1;
          debounceCutm(() => {
            setScoreState(scoreState + 1)
          }, 50);
        }
        ctx.current?.fillRect(x, y, width, height);
      }
        requestAnimationFrame(animate);
    }
    return <canvas id="canvas" ref={canvasRef} width={700} height={500} />;
  };

  return (
    <>
      <CanvasComponent />
      <p>YOUR SCORE IS := &gt; {scoreState}</p>
    </>
  );
}
export default App;
