import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <label className="block">
      <span className="text-gray-200">{label}</span>
      <input
        className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
        {...props}
      />
    </label>
  );
};