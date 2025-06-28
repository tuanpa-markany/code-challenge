import { Listbox } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';

type TokenOption = {
  symbol: string;
  price: number;
};

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
  console.log('tokens', tokens);
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}
      <Listbox value={selected} onChange={onChange}>
        <div className="relative">
          <Listbox.Button className="w-full rounded-md border px-3 py-2 text-sm flex justify-between items-center">
            <span>{selected?.symbol ?? 'Select a token'}</span>
            <ChevronUpDownIcon className="w-4 h-4 text-gray-400" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow-lg text-sm">
            {tokens.map((token) => (
              <Listbox.Option
                key={token.symbol}
                value={token}
                className={({ active }) =>
                  classNames(
                    'cursor-pointer select-none px-3 py-2',
                    active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
                  )
                }
              >
                {({ selected }) => (
                  <div className="flex justify-between items-center">
                    <span>{token.symbol}</span>
                    {selected && (
                      <CheckIcon className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
