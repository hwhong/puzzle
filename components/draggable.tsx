import React from "react";
import styles from "../styles/draggable.module.css";

interface DraggableState {
  isDragging: boolean;
  originalX: number;
  originalY: number;
  translateX: number;
  translateY: number;
  lastTranslateX: number;
  lastTranslateY: number;
  hm: number;
  vm: number;
}

interface Props {
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDrag?: (value: { translateX: number; translateY: number }) => void;
  children: React.ReactNode;
  xIncrements: number;
  yIncrements: number;
}

// origin is the starting point
// lastTranslateX is where it was left off
// translateX is the current
export default class Draggable extends React.Component<Props, DraggableState> {
  state = {
    isDragging: false,
    originalX: 0,
    originalY: 0,
    translateX: 0,
    translateY: 0,
    lastTranslateX: 0,
    lastTranslateY: 0,
    hm: 0,
    vm: 0,
  };

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  private handleMouseDown = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
    if (this.props.onDragStart) {
      this.props.onDragStart();
    }
    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true,
    });
  };

  private handleMouseMove = (e: any) => {
    const { isDragging } = this.state;
    const { xIncrements, yIncrements } = this.props;
    const { clientX, clientY } = e;
    e.preventDefault();
    if (!isDragging) {
      return;
    }
    // "where i am in the container" - "where I dragged from" + "offset from my very beginning"
    // clientX - this.state.originalX = how much I moved
    // lastTranslateX: where I was originally in the dom when the broswer painted me

    // problem is, after it went left, horizonalDiff is negative
    // when we go right again, horinzontalDiff is poistive, but its less than the current translateX
    // so it will get the negative n

    const hDiff = clientX - this.state.originalX;
    const horizontalDiff = hDiff + this.state.lastTranslateX;
    const hm = Math.floor(Math.abs(horizontalDiff) / xIncrements);

    /**
     * Only moves when
     * 1. the new size multiplier is bigger than the previous one
     * 2. the diff is enough to trigger a change
     */
    const isXmoveAllowed =
      hm !== this.state.hm && Math.abs(hDiff) > xIncrements / 1.5;

    if (isXmoveAllowed) {
      const h =
        horizontalDiff > this.state.translateX ? xIncrements : -xIncrements;

      const translateX = this.state.translateX + h;
      this.setState({
        translateX,
        hm,
      });
    }

    const vDiff = clientY - this.state.originalY;
    const verticalDiff = vDiff + this.state.lastTranslateY;
    const vm = Math.floor(Math.abs(verticalDiff) / yIncrements);

    const isYMoveAllowed =
      vm !== this.state.vm && Math.abs(vDiff) > yIncrements / 1.5;

    if (isYMoveAllowed) {
      const v =
        verticalDiff > this.state.translateY ? yIncrements : -yIncrements;

      const translateY = this.state.translateY + v;
      this.setState({
        translateY,
        vm,
      });
    }
  };

  private handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
    this.setState(
      {
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,
        isDragging: false,
        hm: 0,
        vm: 0,
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }
      }
    );
  };

  render() {
    const { children } = this.props;
    const { translateX, translateY, isDragging } = this.state;
    const dragStyle = isDragging ? { opacity: 0.8, cursor: "grabbing" } : {};
    return (
      <div
        onMouseDown={this.handleMouseDown}
        className={styles.root}
        style={{
          transform: `translate(
                ${translateX}px, ${translateY}px)`,
          ...dragStyle,
        }}
      >
        {children}
      </div>
    );
  }
}
