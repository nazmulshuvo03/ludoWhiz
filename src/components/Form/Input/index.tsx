import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input: FC<InputProps> = ({ label = "", className = "", ...props }) => {
  return (
    <div className="flex flex-col">
      {label !== "" && (
        <label className="text-text text-sm ml-2 font-medium pb-1">
          {label}
        </label>
      )}
      <input
        className={`bg-backgroundAccent rounded-xl px-3 py-3 text-text text-lg font-normal shadow placeholder:text-textAccent w-full ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;
