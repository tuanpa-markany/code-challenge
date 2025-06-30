import { Listbox } from '@headlessui/react';
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { TokenOption } from '@fancy-form-nx/types';
import { TokenLogo } from './assets/token-logo';

type TokenSelectProps = {
  label?: string;
  tokens: TokenOption[];
  selected: TokenOption | null;
  onChange: (token: TokenOption) => void;
};

export function TokenSelect({
  label,
  tokens,
  selected,
  onChange,
}: Readonly<TokenSelectProps>) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full rounded-md border px-3 py-2 text-sm flex justify-between items-center bg-white shadow-sm">
            <span className="flex items-center gap-2">
              {selected?.logoUrl && (
                // <img
                //   src={selected.logoUrl}
                //   alt={selected.symbol}
                //   className="w-5 h-5"
                // />
                <TokenLogo logoUrl={selected.logoUrl} alt={selected.symbol} />
              )}
              {selected?.symbol || 'Select a token'}
            </span>
            <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white rounded-md shadow-lg z-10 text-sm max-h-60 overflow-auto">
            {tokens.map((token) => (
              <Listbox.Option
                key={token.symbol}
                value={token}
                className={({ active }) =>
                  classNames(
                    'cursor-pointer select-none px-3 py-2 flex items-center gap-2',
                    active ? 'bg-blue-100' : ''
                  )
                }
              >
                <TokenLogo logoUrl={token.logoUrl} alt={token.symbol} />
                {token.symbol}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
