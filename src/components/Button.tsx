interface ButtonProps {
  onClick: () => void;
  label: string;
}
const Button = ({ onClick, label }: ButtonProps) => {
  return (
    <button
      className="rounded bg-yellow-600 p-2 text-center align-middle text-white"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
