import { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  data: string[];
}

export const Dropdown = ({ data }: DropdownProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef}>
      <div className="items-center cursor-pointer" onClick={() => setShowOptions((prev) => !prev)}>
        <p className="text-gray-500 text-lg">…</p>
      </div>
      {showOptions && (
        <ul className="absolute z-1 flex flex-col bg-white border border-gray-300 rounded-md">
          {data.map((item, index) => (
            <li
              key={index}
              className="w-fit font-pm text-xs sm:text-sm pt-1.5 pb-1.5 pl-2 pr-2 text-center text-gray-600 hover:bg-blue-600 hover:text-white cursor-pointer rounded-md transition"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
