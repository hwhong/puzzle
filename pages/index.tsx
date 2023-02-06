import { ART_WORKS, pprint } from "@/utils/helper";
import { Inter } from "@next/font/google";
import styles from "../styles/index.module.css";
import classNames from "classnames";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], weight: "700" });
// https://codepen.io/knyttneve/pen/dLemVv?editors=1010
export default function Home() {
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
  };

  const onMouseLeave = (e: any) => {
    const ID = e.target.getAttribute("data-hover-id");
    if (document) {
      document.getElementById(ID)!.style.opacity = "0";
      document.getElementById(ID)!.style.transform = "scale(.8)";
      setTimeout(() => {
        document.getElementById(ID)!.remove();
      }, 150);
    }
  };

  const onMouseMove = (e: any) => {
    const ID = e.target.getAttribute("data-hover-id");
    const wrapper = document.getElementById(ID);
    wrapper?.setAttribute("style", handlePosition(e));
  };

  // 1. innerHeight:
  //     height of the page
  // 2. getBoundingClientRect().top:
  //     the distance between the top of the page to the top of the element box
  // 3. offsetHeight:
  //     height of the element
  // 4. clientY
  //     the mouse position

  const handlePosition = (e: any) => {
    const ID = e.target.getAttribute("data-hover-id");
    const wrapper = document.getElementById(ID);
    let top = "";
    // if the top of the artwork name add the popover box is NOT larger then the page height
    //    then safe to display the popover under the name
    //    else move it to the top
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

    // divide it by 2 so that the cursor is in the middle top of the popover
    // prettier-ignore
    return `position: fixed; left: ${ e.clientX - wrapper?.offsetWidth! / 2 }px; top:${top};`;
  };

  const onLinkClicked = () => {
    const elements = document.querySelectorAll(`[data-hover-wrapper]`);
    elements.forEach((e) => {
      e.remove();
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.list}>
        {ART_WORKS.map((w) => {
          return (
            <Link href={`/${w}`} key={w} onClick={onLinkClicked}>
              <div key={w} className={styles.nameWrapper}>
                <a
                  className={classNames(inter.className, styles.name)}
                  onMouseOver={onMouseOver}
                  onMouseLeave={onMouseLeave}
                  onMouseMove={onMouseMove}
                  data-hover-content={`<div> <Image id=\"image\" src=${`/${w}.png`} alt={hoverId} width={150} height={150} /> </div>`}
                >
                  {pprint(w)}
                </a>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
