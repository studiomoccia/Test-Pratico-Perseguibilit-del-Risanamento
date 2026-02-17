
import React from 'react';

interface InputGroupProps {
  label: string;
  id: string;
  value: number;
  onChange: (id: string, value: number) => void;
  tooltip: string;
  sign?: '+' | '-' | 'info';
}

const InputGroup: React.FC<InputGroupProps> = ({ label, id, value, onChange, tooltip, sign }) => {
  const getSignColor = () => {
    if (sign === '+') return 'text-red-600';
    if (sign === '-') return 'text-green-600';
    return 'text-gray-400';
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label htmlFor={id} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          {label}
          <span className="cursor-help text-gray-400" title={tooltip}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </label>
        {sign && (
          <span className={`text-xs font-bold uppercase ${getSignColor()}`}>
            {sign === 'info' ? 'Nota' : sign}
          </span>
        )}
      </div>
      <div className="relative">
        <input
          type="number"
          id={id}
          value={value === 0 ? '' : value}
          placeholder="0"
          onChange={(e) => onChange(id, parseFloat(e.target.value) || 0)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all pr-8"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">€</span>
      </div>
    </div>
  );
};

export default InputGroup;
