/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */

import { useCallback } from "react";

export default function Page() {
  //f(g(x))
  const toInt = (n: string) => {
    return parseInt(n);
  };

  const double = (n: number) => {
    return n * 2;
  };

  const patata = (queso: (n: string) => number) => (m: string) => {
    return queso(m) * 2;
  };
  patata(toInt)("2");

  const pipe = useCallback(
    (...fn: any[]) =>
      (n: any) => {
        return fn.reduce((acc, cur) => {
          return cur(acc);
        }, n);
      },
    []
  );
  double(double(toInt("2")));

  const cuadrupleString = pipe(toInt, double, double);

  console.log(cuadrupleString("2"));
  console.log(cuadrupleString("3"));

  return <></>;
}
