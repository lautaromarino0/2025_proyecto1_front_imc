import React from "react";
import { NumericFormat } from "react-number-format";
import { Label } from "../../ui/Label";
import { useFormContext } from "react-hook-form";

interface KgInputProps {
  name: string;
  label?: string;
  value: number;
  disabled?: boolean;
  className?: string;
  maxDigits?: number;       // máximo de dígitos enteros
  decimalScale?: number;    // decimales permitidos
  onChange: (value: number) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

const KgInput: React.FC<KgInputProps> = ({
  name,
  label = "Peso (Kg)",
  value,
  disabled,
  className,
  maxDigits = 3,     // ✅ máx 999 kg
  decimalScale = 2,  // ✅ por defecto 2 decimales
  onChange,
  onKeyDown,
  inputRef,
}) => {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-1 sm:space-y-2">
      <Label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 block mb-1"
      >
        {label}
      </Label>
      <div className="relative flex items-center">
        <NumericFormat
          thousandSeparator="."
          decimalSeparator=","
          decimalScale={decimalScale}
          fixedDecimalScale={false}
          allowNegative={false}
          getInputRef={inputRef}
          onKeyDown={onKeyDown}
          value={value}
          disabled={disabled}
          onValueChange={(values) => {
            onChange(values.floatValue ?? 0);
          }}
          onFocus={(e) => {
            const length = e.target.value.length;
            // mueve el cursor al final del texto
            e.target.setSelectionRange(length, length);
          }}
          isAllowed={({ floatValue }) => {
            if (floatValue === undefined) return true;

            const [intPart] = floatValue.toString().split(".");
            return intPart.length <= maxDigits;
          }}
          className={
            className || disabled
              ? `w-full text-right p-2 border border-gray-300 rounded-md text-black max-w-[120px] ${className}`
              : "w-full text-right p-2 border border-gray-300 bg-white rounded-md text-black max-w-[120px]"
          }
        />
        <span className="ml-2 text-gray-600">Kg</span>
      </div>
      {errors[name] && (
        <small className="text-red-500">
          {errors[name]?.message as string}
        </small>
      )}
    </div>
  );
};

export default KgInput;
