import { useEffect, useRef } from "react";

export const usePreviousValue = (value: number) => {
  const ref = useRef<number>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
