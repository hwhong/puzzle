import { ART_WORKS, pprint, getTextWidth } from "@/utils/helper";
import { Inter } from "@next/font/google";
import styles from "../styles/index.module.css";
import classNames from "classnames";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function Home() {
  const [hoverId, setHoverId] = useState<string | undefined>(undefined);

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {ART_WORKS.map((w) => {
          return (
            <div key={w} className={styles.nameWrapper}>
              <a
                key={w}
                className={classNames(inter.className, styles.name)}
                onMouseEnter={() => setHoverId(w)}
                onMouseLeave={() => setHoverId(undefined)}
              >
                {pprint(w)}
              </a>
              {hoverId === w && (
                <div
                  className={styles.content}
                  style={{ left: getTextWidth(w) }}
                >
                  HELELELE
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
