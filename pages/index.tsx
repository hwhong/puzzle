import Draggable from "@/components/draggable";
import { Inter } from "@next/font/google";
import { useEffect, useRef } from "react";
import styles from "../styles/index.module.css";
import img from "../public/wave.png";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });
const SIZE = 100;

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemsRef = useRef<HTMLCanvasElement[]>([]);
  useEffect(() => {
    const initItems = () => {
      if (itemsRef.current[0]) {
        for (let y = 0; y < 5; y++) {
          for (let x = 0; x < 5; x++) {
            const ctx = itemsRef.current[y * 5 + x]?.getContext("2d");
            if (ctx) {
              // prettier-ignore
              ctx.drawImage(
                image,
                x * SIZE, y * SIZE, SIZE, SIZE,
                0, 0, SIZE, SIZE
              );

              // x is starting, d is destination
              //drawImage(image,
              // sx, sy, sw, sh,
              // dx, dy, dw, dh);
            }
          }
        }
      }
    };

    const image = document.createElement("img");
    image.setAttribute("src", "/wave.png");
    itemsRef.current = itemsRef.current.slice(0, 25);
    image.src = "/wave.png";
    image.addEventListener("load", () => {
      initItems();
    });
  }, [itemsRef]);

  return (
    <div className={styles.root}>
      {Array.from(Array(25).keys()).map((i) => (
        <Draggable xIncrements={100} yIncrements={20} key={i}>
          <canvas
            ref={(el) => {
              if (itemsRef.current && el) {
                itemsRef.current[i] = el;
              }
            }}
            width={100}
            height={100}
          />
        </Draggable>
      ))}
      {/* <Draggable xIncrements={100} yIncrements={20} key={"one"}>
        <canvas ref={canvasRef} width={100} height={100} />
      </Draggable>
      <Draggable xIncrements={100} yIncrements={20} key={"two"}>
        <div className={styles.square}>2</div>
      </Draggable>
      <Draggable xIncrements={100} yIncrements={20} key={"three"}>
        <div className={styles.square}>3</div>
      </Draggable>
      <Draggable xIncrements={100} yIncrements={20} key={"four"}>
        <div className={styles.square}>4</div>
      </Draggable> */}
    </div>
  );
}
