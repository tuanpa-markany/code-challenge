type SwapButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export function SwapButton({ onClick, disabled }: SwapButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      Swap
    </button>
  );
}
