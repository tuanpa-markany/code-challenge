type AmountInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export function AmountInput({
  label,
  value,
  onChange,
  disabled = false,
  placeholder,
}: Readonly<AmountInputProps>) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full border rounded-md px-3 py-2 text-sm shadow-sm focus:outline-none disabled:opacity-50 appearance-none"
        placeholder={placeholder ?? '0.00'}
      />
    </div>
  );
}
