import { useEffect } from "react";

// This hook can be used in App.tsx
// iPhone SE runs at ~50-80% CPU in simulator with useBurnCPU(9, 30);
export const useBurnCPU = (baseNumber: number, interval: number): void => {
  function mySlowFunction(baseNumber: number): void {
    let result = 0;
    for (let i = Math.pow(baseNumber, 7); i >= 0; i--) {
      result += Math.atan(i) * Math.tan(i);
    }
  }
  useEffect(() => {
    setInterval(() => {
      mySlowFunction(baseNumber); // higher number => more iterations => slower
    }, interval);
  }, [baseNumber, interval]);
};
