"use client";

interface Props {
  open?: boolean;
  close: (callback: () => void) => void;
}
const Modal = ({ open, close }: Props) => {
	const onClose = () => {
		console.log("ey desde el hijo")
	}
  return (
    <>
      {open && (
        <div className="absolute h-1/2 w-1/2 bg-slate-400 shadow-md flex flex-col">
          <header>
            <button onClick={() => close(onClose)}>x</button>
          </header>
          <main className="flex-1">
            <h1>Modal</h1>
          </main>
        </div>
      )}
    </>
  );
};

export default Modal;
