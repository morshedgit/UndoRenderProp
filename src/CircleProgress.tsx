import * as React from "react";

export const CircleProgress = (props: {
  counter: number;
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="relative w-fit h-fit">
      <svg
        id="svg"
        width="1em"
        height="1em"
        viewBox="0 0 100 100"
        className={`${props.className}`}
      >
        <circle
          className="circle_progress__track"
          r="40"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray="251.20"
          strokeDashoffset={0}
          strokeWidth={10}
        ></circle>
        <circle
          className="circle_progress__bar"
          r="40"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray="251.20"
          strokeDashoffset={251.2 - (props.counter * 251.2) / 100}
          strokeWidth={10}
        ></circle>
      </svg>

      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        {props.children}
      </div>
    </div>
  );
};
