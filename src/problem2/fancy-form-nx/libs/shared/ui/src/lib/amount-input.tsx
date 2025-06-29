type AmountInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function AmountInput({
  label,
  value,
  onChange,
  placeholder,
}: Readonly<AmountInputProps>) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange((e.target as HTMLInputElement).value)}
        placeholder={placeholder ?? '0.00'}
        className="w-full border rounded-md px-3 py-2 text-sm appearance-none"
        min="0"
        step="any"
      />
    </div>
  );
}
