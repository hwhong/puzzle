import { ART_WORKS, pprint, getTextWidth } from "@/utils/helper";
import { Inter } from "@next/font/google";
import styles from "../styles/index.module.css";
import classNames from "classnames";
import { useState } from "react";
import Image from "next/image";
import img from "../public/blue_nude_ii.png";

const inter = Inter({ subsets: ["latin"], weight: "700" });

export default function Home() {
  const [hoverId, setHoverId] = useState<string | undefined>(undefined);

  const onMouseOver = (e: any) => {
    const hoverContent = e.target.getAttribute("data-hover-content");
    const ID = Math.random().toString(36).substr(2, 9);
    const wrapper = document.createElement("DIV");
    e.target.setAttribute("data-hover-id", ID);
    wrapper.setAttribute("data-hover-wrapper", "");
    wrapper.setAttribute("id", ID);
    wrapper.setAttribute("style", "opacity: 0; transform: scale(.8);");
    wrapper.innerHTML = hoverContent;
    document.body.append(wrapper);
    wrapper.setAttribute("style", handlePosition(e));

    // // You can remove this line when you are using. I had added for the demo.
    // if (document.querySelector(".info"))
    //   document.querySelector(".info").remove();
  };

  const onMouseLeave = (e: any) => {
    const ID = e.target.getAttribute("data-hover-id");

    document.getElementById(ID).style.opacity = 0;
    document.getElementById(ID).style.transform = "scale(.8)";
    setTimeout(() => {
      document.getElementById(ID).remove();
    }, 150);
  };

  const onMouseMove = (e: any) => {
    const ID = e.target.getAttribute("data-hover-id");
    const wrapper = document.getElementById(ID);
    wrapper?.setAttribute("style", handlePosition(e));
  };

  const handlePosition = (e: any) => {
    const ID = e.target.getAttribute("data-hover-id");
    const wrapper = document.getElementById(ID);
    let top = "";
    if (
      !(
        e.target.getBoundingClientRect().top + wrapper?.offsetHeight >
        innerHeight
      )
    ) {
      top = `${e.clientY + e.target.offsetHeight}px`;
    } else {
      top = `${e.clientY - (wrapper?.offsetHeight + e.target.offsetHeight)}px`;
    }

    return `position: fixed; left: ${
      e.clientX - wrapper?.offsetWidth! / 2
    }px; top:${top};`;
  };

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {ART_WORKS.map((w) => {
          return (
            <div key={w} className={styles.nameWrapper}>
              <a
                key={w}
                className={classNames(inter.className, styles.name)}
                onMouseOver={(e) => {
                  onMouseOver(e);
                }}
                onMouseLeave={onMouseLeave}
                onMouseMove={onMouseMove}
                // onMouseEnter={() => setHoverId(w)}
                // onMouseLeave={() => setHoverId(undefined)}
                data-hover-content={`<div> <Image id=\"image\" src=${`/${w}.png`} alt={hoverId} width={150} height={150} /> </div>`}
              >
                {pprint(w)}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// const links = document.getElementsByTagName("a");

// [...links].forEach((link) => {
//   link.addEventListener("mouseover", handleMouseOver);
//   link.addEventListener("mousemove", handleMouseMove);
//   link.addEventListener("mouseleave", handleMouseLeave);
// });

// window.addEventListener("scroll", () => {
//   const wrapper = document.querySelector("[data-hover-wrapper]");
//   if (wrapper) wrapper.remove();
// });
