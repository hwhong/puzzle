import { ART_WORKS, shuffleArray } from "@/utils/helper";
import Draggable from "@/components/draggable";
import { useEffect, useRef } from "react";
import styles from "../styles/puzzle.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const TOTAL_LENGTH = 500;
const SIDE = 4;

const SIZE = TOTAL_LENGTH / SIDE;
const X_INCREMENTS = SIZE;
const Y_INCREMENTS = SIZE;
const TOTAL_PIECES = 16;

export default function Puzzle() {
  const router = useRouter();
  const itemsRef = useRef<HTMLCanvasElement[]>([]);

  const { puzzleId } = router.query;

  useEffect(() => {
    const initItems = () => {
      if (itemsRef.current[0]) {
        for (let y = 0; y < SIDE; y++) {
          for (let x = 0; x < SIDE; x++) {
            const ctx = itemsRef.current[y * 4 + x]?.getContext("2d");
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

    itemsRef.current = itemsRef.current.slice(0, TOTAL_PIECES);

    const image = document.createElement("img");
    image.setAttribute("src", `/${puzzleId}.png`);
    image.addEventListener("load", () => {
      initItems();
    });
  }, [itemsRef, puzzleId]);

  return (
    <div className={styles.root}>
      <div className={styles.top}></div>
      <div className={styles.primaryContent}>
        <div className={styles.piecesWrapper}>
          {shuffleArray(
            Array.from(Array(TOTAL_PIECES).keys()).map((i) => (
              <Draggable
                xIncrements={X_INCREMENTS}
                yIncrements={Y_INCREMENTS}
                className={styles.draggable}
                key={i}
              >
                <canvas
                  ref={(el) => {
                    if (itemsRef.current && el) {
                      itemsRef.current[i] = el;
                    }
                  }}
                  width={SIZE}
                  height={SIZE}
                />
              </Draggable>
            ))
          )}
        </div>
        <div className={styles.canvasWrapper}>
          <div className={styles.canvas}>
            {Array.from(Array(TOTAL_PIECES).keys()).map((i) => (
              <div key={i} className={styles.outline}></div>
            ))}
          </div>
        </div>
        <div className={styles.pictureWrapper}>
          <Image
            src={`/${puzzleId}.png`}
            width={250}
            height={250}
            alt="example"
            className={styles.exampleImage}
          />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return { props: {} };
}

export async function getStaticPaths() {
  const posts = ART_WORKS;
  const paths = posts.map((post) => ({
    params: { puzzleId: post },
  }));

  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}
