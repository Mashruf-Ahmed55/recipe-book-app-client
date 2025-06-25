import React, { type SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  id?: string;
  options: { label: string; value: string }[];
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  id,
  options,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <select
        id={id}
        className={`
          w-full px-3 py-2 bg-white dark:bg-gray-700 border shadow-xs
          rounded-md text-gray-800 dark:text-white
          focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500
          placeholder-gray-400 dark:placeholder-gray-400
          transition-colors duration-200
          ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
          ${className}
        `}
        {...props}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
};

export default Select;
