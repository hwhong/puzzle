import Draggable from "@/components/draggable";
import { Inter } from "@next/font/google";
import styles from "../styles/index.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={styles.root}>
      <Draggable xIncrements={100} yIncrements={20} key={"one"}>
        <div className={styles.square}>1</div>
      </Draggable>
      <Draggable xIncrements={100} yIncrements={20} key={"two"}>
        <div className={styles.square}>2</div>
      </Draggable>
      <Draggable xIncrements={100} yIncrements={20} key={"three"}>
        <div className={styles.square}>3</div>
      </Draggable>
      <Draggable xIncrements={100} yIncrements={20} key={"four"}>
        <div className={styles.square}>4</div>
      </Draggable>
    </div>
  );
}
