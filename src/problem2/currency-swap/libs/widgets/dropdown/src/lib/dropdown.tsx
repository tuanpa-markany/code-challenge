import React, { Fragment } from 'react';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';

const TOKEN_ICON_BASE_URL =
  'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens';

type Price = {
  currency: string;
  date: string;
  price: number;
};

type DropdownProps = {
  label: string;
  selected: string;
  setSelected: (value: string) => void;
  prices: Price[] | undefined;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  selected,
  setSelected,
  prices,
}) => {
  const uniquePrices = prices
    ? Array.from(new Map(prices.map((p) => [p.currency, p])).values())
    : [];

  return (
    <div className="mb-3 relative">
      <label className="block text-sm font-medium">{label}</label>
      <Menu as="div" className="relative inline-block text-left w-full">
        <div>
          <MenuButton className="w-full flex items-center justify-between px-3 py-2 border rounded-lg bg-white">
            <span>{selected}</span>
            <img
              src={`${TOKEN_ICON_BASE_URL}/${selected}.svg`}
              alt={selected}
              className="w-5 h-5"
            />
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute left-0 mt-2 w-full origin-top-right bg-white border rounded-lg shadow-lg focus:outline-none max-h-40 overflow-y-auto z-50">
            {uniquePrices.map(({ currency }) => (
              <MenuItem key={currency}>
                {({ active }) => (
                  <button
                    onClick={() => setSelected(currency)}
                    className={`w-full px-3 py-2 flex items-center space-x-3 text-left ${
                      active ? 'bg-blue-100' : ''
                    }`}
                  >
                    <img
                      src={`${TOKEN_ICON_BASE_URL}/${currency}.svg`}
                      alt={currency}
                      className="w-5 h-5"
                    />
                    <span>{currency}</span>
                  </button>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
