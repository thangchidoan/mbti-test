import React from "react";

const RadioOption = ({ value, selectedValue, onChange, sizeClass }) => {
  const isSelected = selectedValue === value;

  return (
    <div className="flex flex-col items-center gap-2">
      <label className="cursor-pointer flex items-center justify-center group relative p-1 md:p-2">
        <input
          type="radio"
          name="scale"
          value={value}
          checked={isSelected}
          onChange={() => onChange(value)}
          className="sr-only"
        />
        <div
          className={`
            rounded-full border-2 transition-all duration-200
            ${sizeClass}
            ${
              isSelected
                ? "bg-black border-black"
                : "border-neutral-300 bg-transparent hover:border-neutral-400"
            }
          `}
        />
      </label>
    </div>
  );
};

export default RadioOption;
