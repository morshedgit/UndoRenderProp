import * as React from "react";
import { useState, useRef } from "react";
import { CircleProgress } from "./CircleProgress";
import "./styles.css";

const WAIT_TIME = 3000;

const UndoComp = (props: {
  undoTime: number;
  children: (
    waiting: boolean,
    triggerAction: () => void,
    undoAction: () => void,
    timer: number
  ) => JSX.Element;
  onAction: () => void;
}) => {
  const [waiting, setWaiting] = useState(false);
  const [timer, setTimer] = useState(props.undoTime / 100);
  const undoRef = useRef(false);
  const timerRef = useRef<number>(null);

  /**
   *
   * @param check
   * @param t
   */
  const cancelAction = (t: number) => {
    return new Promise((res) => {
      const intervalId = setInterval(() => {
        if (undoRef.current) res(true);
      }, 100);

      setTimeout(() => {
        res(true);
        clearInterval(intervalId);
      }, t);
    });
  };

  /**
   *
   */
  const handleTriggerAction = async () => {
    const timerInterval = setInterval(() => setTimer((v) => v - 1), 100);
    timerRef.current = timerInterval;
    try {
      setWaiting(true);
      // debugger;
      await cancelAction(props.undoTime);
      if (undoRef.current) return;
      props.onAction();
    } finally {
      setWaiting(false);
      setTimer(props.undoTime / 100);
      clearInterval(timerInterval);
      undoRef.current = false;
    }
  };

  /**
   *
   */
  const handleUndoAction = () => {
    setWaiting(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTimer(props.undoTime / 100);
    undoRef.current = true;
  };
  return props.children(waiting, handleTriggerAction, handleUndoAction, timer);
};

export default function App() {
  return (
    <div className="w-screen flex flex-col items-center p-24">
      {/* <form action="" className="flex flex-col items-strech shadow-md p-10">
        <fieldset>
          <label htmlFor="">
            First Name
            <input type="text" name="fName" className="border" />
          </label>
        </fieldset>
        <fieldset>
          <label htmlFor="">
            Last Name
            <input type="text" name="lName" className="border" />
          </label>
        </fieldset>
        <fieldset className="flex justify-between p-4">
          <button type="submit" className="border p-4">
            Save
          </button>
        </fieldset>
      </form> */}

      <UndoComp undoTime={WAIT_TIME} onAction={() => alert("Reset")}>
        {(waiting, triggerAction, undoAction, timer) => (
          <button
            type="button"
            className="border p-4 flex gap-x-4"
            onClick={waiting ? undoAction : triggerAction}
          >
            {waiting && (
              <CircleProgress
                counter={100 - timer * (10000 / WAIT_TIME)}
                className="text-3xl"
              >
                {timer}
              </CircleProgress>
            )}
            {waiting ? ` Undo` : `Reset`}
          </button>
        )}
      </UndoComp>
    </div>
  );
}
