import { useState } from 'react';
import classNames from 'classnames';

type SwapButtonProps = {
  onClick: () => Promise<void> | void;
  disabled: boolean;
};

export function SwapButton({ onClick, disabled }: Readonly<SwapButtonProps>) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (disabled || isLoading) return;
    try {
      setIsLoading(true);
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      className={classNames(
        'w-full flex justify-center items-center px-4 py-2 rounded-md text-white transition-colors',
        {
          'bg-blue-600 hover:bg-blue-700': !disabled && !isLoading,
          'bg-blue-300 cursor-not-allowed': disabled || isLoading,
        }
      )}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      ) : (
        'Swap'
      )}
    </button>
  );
}
