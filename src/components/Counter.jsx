import React from "react";
import useStore from "../store/store";

const Counter = () => {
  const { count, increment, decrement } = useStore();
  return (
    <div className="flex flex-col">
      <div>count is {count}</div>
      <div className="flex gap-2 justify-center text-white">
        <button
          className=" bg-primary rounded px-4 py-2"
          onClick={() => increment()}
        >
          +
        </button>
        <button
          className=" bg-primary rounded px-4 py-2"
          onClick={() => decrement()}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
