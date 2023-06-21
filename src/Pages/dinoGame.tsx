import React, { useEffect, useRef } from 'react'
interface stateObject {
    x: number;
    y: number;
    width?: number;
}
export const DinoGame = () => {
    const ctx = useRef<CanvasRenderingContext2D | undefined | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const XY = useRef<stateObject>({ x: 100, y: 475, width: 70 });
    const pointerXY = useRef<stateObject>({ x: 100, y: 400 });
    useEffect(() => {
        const canvas = canvasRef.current;
        ctx.current = canvas?.getContext("2d");
    }, [canvasRef.current]);
    useEffect(() => {
        animate()
    }, []);
    (function () {
        console.log("oppopop")
        window.addEventListener("keydown", (key) => {
            switch (key.keyCode) {
                case 37:
                    goRIght();
                    break;
                case 39:
                    goLeft();
                    break;
            }
        })
    })();
    function goRIght() {
        XY.current.x += 10
        animate();
    }
    function goLeft() {
        XY.current.x -= 10
        animate();
    }


    function animate() {
        let x = XY.current.x;
        let y = XY.current.y;
        // let xB = ++pointerXY.current.x <= 697 ? pointerXY.current.x : --pointerXY.current.x
        let xB = pointerXY.current.x
        let yB = pointerXY.current.y 
        console.log("", xB, pointerXY.current.x)
        debugger
        let width = XY.current?.width ? XY.current.width : 0;
        let height = 20;
        const color = "black";
        const canvas = canvasRef.current;
        ctx.current?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
        
            drawRoundedRect(xB, pointerXY.current.y, 10, 10, 10);
       
        if (ctx.current && ctx.current.fillStyle) {
            ctx.current.fillStyle = color;
        }
        ctx.current?.fillRect(
            x, y,
            width,
            height
        );
        requestAnimationFrame(animate);
    }

    async function drawRoundedRect(
        pointx: number,
        pointy: number,
        width: number,
        height: number,
        radius: number
    ) {
        if (ctx && ctx.current) {
            ctx.current.clearRect(pointx, pointy, width, height);
            ctx.current.beginPath();
            ctx.current.arc(pointx + 1, pointy, radius, 0, Math.PI * 2);
            ctx.current.fillStyle = 'black';
            ctx.current.fill();
            ctx.current.closePath();
        }
    }
    return (
        <>
            <canvas id="canvas" ref={canvasRef} width={700} height={500} />
        </>
    )
}


