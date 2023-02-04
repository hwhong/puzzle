import { ART_WORKS, calculateMargin, shuffleArray } from "@/utils/helper";
import Draggable from "@/components/draggable";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/puzzle.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"], weight: "700" });

// changes with global variable pieze-size
const TOTAL_LENGTH = 400;
const SIDE = 4;

const SIZE = TOTAL_LENGTH / SIDE;
const X_INCREMENTS = SIZE;
const Y_INCREMENTS = SIZE;
const TOTAL_PIECES = 16;

export default function Puzzle() {
  const router = useRouter();
  const itemsRef = useRef<HTMLCanvasElement[]>([]);
  const rootRef = useRef<HTMLDivElement>(null);
  const [margin, setMargin] = useState(0);

  const { puzzleId } = router.query;

  useEffect(() => {
    const initItems = () => {
      if (itemsRef.current[0]) {
        for (let y = 0; y < SIDE; y++) {
          for (let x = 0; x < SIDE; x++) {
            const ctx = itemsRef.current[y * SIDE + x]?.getContext("2d");
            if (ctx) {
              // prettier-ignore
              ctx.drawImage(
                image,
                x * SIZE, y * SIZE, SIZE, SIZE,
                0, 0, SIZE, SIZE
              );

              // x is starting, d is destination
              // drawImage(image,
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
    if (rootRef.current) {
      setMargin(calculateMargin(rootRef.current.offsetWidth, SIZE));
    }
  }, [itemsRef, puzzleId]);

  return (
    <div className={styles.root} ref={rootRef}>
      <div className={styles.top}>
        <Link href="/">
          <p className={classNames(styles.back, inter.className)}>Back</p>
        </Link>
      </div>
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
        <div
          className={styles.canvasWrapper}
          style={{
            marginLeft: margin,
          }}
        >
          <div className={styles.canvas}>
            {Array.from(Array(TOTAL_PIECES).keys()).map((i) => (
              <div key={i} className={styles.outline}></div>
            ))}
          </div>
        </div>
        <Image
          src={`/${puzzleId}.png`}
          width={250}
          height={250}
          alt="example"
          className={styles.exampleImage}
        />
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
