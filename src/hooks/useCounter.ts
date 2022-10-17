import { useReducer } from "react";

type TCountActions =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "nearestOdd" }
  | { type: "subtract"; payload: { value: number } }
  | { type: "randomize" }
  | { type: "reset" };

type TCoutState = {
  count: number;
};

function countReducer(state: TCoutState, action: TCountActions) {
  switch (action.type) {
    case "subtract": {
      const { value } = action.payload;
      const nextCount = state.count - value;
      if (nextCount <= 0) {
        return { count: 0 };
      }
      return { count: nextCount };
    }
    case "nearestOdd": {
      const isOdd = Boolean(state.count % 2);
      if (isOdd) {
        return { count: state.count + 2 };
      }
      return { count: state.count + 1 };
    }
    case "randomize": {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      return { count: state.count + randomNumber };
    }
    case "increment": {
      return { count: state.count + 1 };
    }
    case "decrement": {
      console.log(state.count);
      const nextCount = state.count - 1;
      if (nextCount >= 0) {
        return { count: nextCount };
      }
      return state;
    }
    case "reset": {
      return { count: 0 };
    }
    default:
      throw new Error();
  }
}

export const useCounter = (initState?: TCoutState) => {
  return useReducer(countReducer, initState ?? { count: 0 });
};
