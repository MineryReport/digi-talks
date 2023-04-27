
"use client";
import {
  type ChangeEventHandler,
  useRef,
  useState,
} from "react";

export default function Page() {
  const [value, setValue] = useState("");
  const [valueError, setValueError] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLInputElement>(null);

  const validate: ChangeEventHandler<HTMLInputElement> = (ev) => {
    const txt = ev.target.value;
    if (txt.length > 3) {
      setValueError(false);
    } else {
      setValueError(true);
    }
    setValue(ev.target.value);
  };

  const submit = () => {
    const secondInput = ref.current?.value;
    if (!valueError) {
      console.log({ firstInput: value, secondInput, open });
    } else {
      console.log("tienes un error");
    }
  };

  
  return (
    <>
      <input
        type="text"
        className={`border-b-2 px-5 py-2 ${
          valueError ? "border-b-red-500" : ""
        }`}
        value={value}
        onChange={validate}
        placeholder="cambio state on change"
      />

      <input
        type="text"
        className="border-b-2 px-5 py-2"
        ref={ref}
        placeholder="no controlado"
      />
      <button
        onClick={() => {
          console.log(ref.current?.value ?? "");
        }}
      >
        log valor no controlado
      </button>
      {open ? "open" : "closed"}
      <button
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        open modal
      </button>
      <button onClick={submit}>Submit</button>
    </>
  );
}
