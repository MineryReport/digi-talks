"use client";

import { useState, forwardRef, useRef, useEffect, useMemo, useCallback } from "react";
import Button from "~/components/Button";

interface StateProps {
  onUpdate: (val: number) => void;
}
const StateExample = forwardRef<HTMLHeadingElement, StateProps>(
  ({ onUpdate }, textRef) => {
    const [count, setCount] = useState<number>(0);

	const measure = performance.now()
	const hugeArray = new Array(1000000).fill(0).map((item, i) => i)
	console.log("without memo",performance.now() - measure)

	const measure2 = performance.now()
	const hugeArrayMemo = useMemo(() => new Array(1000000).fill(0).map((item, i) => i), [])
	console.log("with memo",performance.now() - measure2)

	
	const cachedUpdate = useCallback(() => {
		setCount((prev) => prev + 1);
      	onUpdate(count + 1);
	}, [])

    const update = () => {
      setCount((prev) => prev + 1);
      onUpdate(count + 1);
    };

    return (
      <div>
        <h2 ref={textRef} className="text-center text-lg mb-5">{count}</h2>
		<div className="flex gap-2">
        <Button label="Increment" onClick={() => update()} />
        <Button label="Increment cached" onClick={() => cachedUpdate()} />
		</div>
      </div>
    );
  }
);
StateExample.displayName = "StateExample";

export default function Page() {
  const [counterVal, updateCounter] = useState<number>(0);
  const [fromEffect, updateFromEffect] = useState<number>(0);
  const counterRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
	updateFromEffect(counterVal)
  }, [counterVal, updateFromEffect])

  // useState, useRef, useMemo, useCallback, useEffect

  return (
    <div className="py-10">
      <h1 className="mb-10 text-3xl underline underline-offset-8">React</h1>
      <div className="flex flex-col gap-10 2xl:flex-row">
        <StateExample ref={counterRef} onUpdate={updateCounter} />
        <h2>{`Counter From Effect:${fromEffect}`}</h2>
        <Button
          onClick={() =>
            console.log(
              `Counter value: ${counterRef.current?.textContent ?? ""}`
            )
          }
          label={"Log counter value"}
        />
      </div>
    </div>
  );
}
