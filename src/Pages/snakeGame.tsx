import React, { useEffect, useRef, useState } from "react";
import "../App.css";
import { stateObject } from "../interface/interface";

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function debounceCutm(fun: () => void, delay: number) {
  let timerId;
  clearTimeout(timerId);
  timerId = setTimeout(fun, delay);
}

function SnakeGame() {
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
  useEffect(() => {
    const handleKeyDown = () => {
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
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
    ctx.current?.arcTo(
      pointx + width,
      pointy,
      pointx + width,
      pointy + radius,
      radius
    );
    ctx.current?.lineTo(pointx + width, pointy + height - radius);
    ctx.current?.arcTo(
      pointx + width,
      pointy + height,
      pointx + width - radius,
      pointy + height,
      radius
    );
    ctx.current?.lineTo(pointx + radius, pointy + height);
    ctx.current?.arcTo(
      pointx,
      pointy + height,
      pointx,
      pointy + height - radius,
      radius
    );
    ctx.current?.lineTo(pointx, pointy + radius);
    ctx.current?.arcTo(pointx, pointy, pointx + radius, pointy, radius);
    ctx.current?.closePath();
    if (ctx.current && ctx.current.fillStyle) {
      ctx.current.fillStyle = "black";
    }
    ctx.current?.fill();
  }

  const CanvasComponent = () => {
    let width = 40;
    let height = 15;
    const color = "black";

    useEffect(() => {
      ctx.current = canvasRef.current?.getContext("2d");
    }, [canvasRef.current]);

    useEffect(() => {
      animate();
    }, [togo.current]);

    async function animate() {
      await sleep(scoreState === 0 ? 10 : 30 * scoreState).then(() => { 
        if (ctx.current) {
          const canvas = canvasRef.current;
          ctx.current?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
          drawRoundedRect(pointerXY.current.x, pointerXY.current.y, 20, 20, 20);
          width = 40;
          height = 15;
          switch (togo.current) {
            case "left":
              if (snakeCodi.current.x >= 700) {
                snakeCodi.current.x = snakeCodi.current.x - 700;
              } else if (snakeCodi.current.y >= 500) {
                snakeCodi.current.y = snakeCodi.current.y - 500;
              } else {
                snakeCodi.current.x += 2;
              }
              break;
            case "right":
              if (snakeCodi.current.x <= 0) {
                snakeCodi.current.x = 700;
              } else if (snakeCodi.current.y <= 0) {
                snakeCodi.current.y = 500;
              } else {
                snakeCodi.current.x -= 2;
              }
              break;
            case "up":
              if (snakeCodi.current.x >= 700) {
                snakeCodi.current.x = snakeCodi.current.x - 700;
              } else if (snakeCodi.current.y >= 500) {
                snakeCodi.current.y = snakeCodi.current.y - 500;
              } else {
                snakeCodi.current.y += 2;
              }
              break;
            case "down":
              if (snakeCodi.current.x <= 0) {
                snakeCodi.current.x = 700;
              } else if (snakeCodi.current.y <= 0) {
                snakeCodi.current.y = 500;
              } else {
                snakeCodi.current.y -= 2;
              }
              break;
          }

          if (ctx.current && ctx.current.fillStyle) {
            ctx.current.fillStyle = color;
          }

          let checkforX =
            snakeCodi.current.x === pointerXY.current.x ||
            snakeCodi.current.x === pointerXY.current.x + 1 ||
            snakeCodi.current.x === pointerXY.current.x + 2 ||
            snakeCodi.current.x === pointerXY.current.x + 3 ||
            snakeCodi.current.x === pointerXY.current.x + 4 ||
            snakeCodi.current.x === pointerXY.current.x + 5 ||
            snakeCodi.current.x === pointerXY.current.x + 6 ||
            snakeCodi.current.x === pointerXY.current.x + 7 ||
            snakeCodi.current.x === pointerXY.current.x + 8 ||
            snakeCodi.current.x === pointerXY.current.x + 9 ||
            snakeCodi.current.x === pointerXY.current.x + 10 ||
            snakeCodi.current.x === pointerXY.current.x + 11 ||
            snakeCodi.current.x === pointerXY.current.x + 12 ||
            snakeCodi.current.x === pointerXY.current.x + 13 ||
            snakeCodi.current.x === pointerXY.current.x + 14 ||
            snakeCodi.current.x === pointerXY.current.x + 15 ||
            snakeCodi.current.x === pointerXY.current.x + 16 ||
            snakeCodi.current.x === pointerXY.current.x + 17 ||
            snakeCodi.current.x === pointerXY.current.x + 18 ||
            snakeCodi.current.x === pointerXY.current.x + 19 ||
            snakeCodi.current.x === pointerXY.current.x - 1 ||
            snakeCodi.current.x === pointerXY.current.x - 2 ||
            snakeCodi.current.x === pointerXY.current.x - 4 ||
            snakeCodi.current.x === pointerXY.current.x - 5 ||
            snakeCodi.current.x === pointerXY.current.x - 6 ||
            snakeCodi.current.x === pointerXY.current.x - 7 ||
            snakeCodi.current.x === pointerXY.current.x - 8 ||
            snakeCodi.current.x === pointerXY.current.x - 9 ||
            snakeCodi.current.x === pointerXY.current.x - 3 ||
            snakeCodi.current.x === pointerXY.current.x - 10 ||
            snakeCodi.current.x === pointerXY.current.x - 11 ||
            snakeCodi.current.x === pointerXY.current.x - 12 ||
            snakeCodi.current.x === pointerXY.current.x - 14 ||
            snakeCodi.current.x === pointerXY.current.x - 15 ||
            snakeCodi.current.x === pointerXY.current.x - 16 ||
            snakeCodi.current.x === pointerXY.current.x - 17 ||
            snakeCodi.current.x === pointerXY.current.x - 18 ||
            snakeCodi.current.x === pointerXY.current.x - 19 ||
            snakeCodi.current.x === pointerXY.current.x - 13;

          let checkforY =
            snakeCodi.current.y === pointerXY.current.y ||
            snakeCodi.current.y === pointerXY.current.y + 1 ||
            snakeCodi.current.y === pointerXY.current.y + 2 ||
            snakeCodi.current.y === pointerXY.current.y + 3 ||
            snakeCodi.current.y === pointerXY.current.y + 4 ||
            snakeCodi.current.y === pointerXY.current.y + 5 ||
            snakeCodi.current.y === pointerXY.current.y + 6 ||
            snakeCodi.current.y === pointerXY.current.y + 7 ||
            snakeCodi.current.y === pointerXY.current.y + 8 ||
            snakeCodi.current.y === pointerXY.current.y + 9 ||
            snakeCodi.current.y === pointerXY.current.y - 1 ||
            snakeCodi.current.y === pointerXY.current.y - 2 ||
            snakeCodi.current.y === pointerXY.current.y - 4 ||
            snakeCodi.current.y === pointerXY.current.y - 5 ||
            snakeCodi.current.y === pointerXY.current.y - 6 ||
            snakeCodi.current.y === pointerXY.current.y - 7 ||
            snakeCodi.current.y === pointerXY.current.y - 8 ||
            snakeCodi.current.y === pointerXY.current.y - 9 ||
            snakeCodi.current.y === pointerXY.current.y - 3 ||
            snakeCodi.current.y === pointerXY.current.y + 11 ||
            snakeCodi.current.y === pointerXY.current.y + 12 ||
            snakeCodi.current.y === pointerXY.current.y + 13 ||
            snakeCodi.current.y === pointerXY.current.y + 14 ||
            snakeCodi.current.y === pointerXY.current.y + 15 ||
            snakeCodi.current.y === pointerXY.current.y + 16 ||
            snakeCodi.current.y === pointerXY.current.y + 17 ||
            snakeCodi.current.y === pointerXY.current.y + 18 ||
            snakeCodi.current.y === pointerXY.current.y + 19 ||
            snakeCodi.current.y === pointerXY.current.y + 10 ||
            snakeCodi.current.y === pointerXY.current.y - 10 ||
            snakeCodi.current.y === pointerXY.current.y - 11 ||
            snakeCodi.current.y === pointerXY.current.y - 12 ||
            snakeCodi.current.y === pointerXY.current.y - 14 ||
            snakeCodi.current.y === pointerXY.current.y - 15 ||
            snakeCodi.current.y === pointerXY.current.y - 16 ||
            snakeCodi.current.y === pointerXY.current.y - 17 ||
            snakeCodi.current.y === pointerXY.current.y - 18 ||
            snakeCodi.current.y === pointerXY.current.y - 19 ||
            snakeCodi.current.y === pointerXY.current.y - 13;

          if (
            checkforX &&
            checkforY &&
            pointerXY.current.x !== 0 &&
            pointerXY.current.y !== 0 &&
            snakeCodi.current.x !== 0 &&
            snakeCodi.current.y !== 0
          ) {
            score.current = score.current + 1;
            debounceCutm(() => {
              setScoreState(scoreState + 1);
            }, 50);
          }
          ctx.current?.fillRect(
            snakeCodi.current.x,
            snakeCodi.current.y,
            width,
            height
          );
        }
        requestAnimationFrame(animate);
      });
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
export default SnakeGame;
