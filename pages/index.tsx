import { Inter } from "@next/font/google";
import styles from "../styles/index.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <div className={styles.root}></div>;
}
