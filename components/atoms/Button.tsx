import React, { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'; // Define custom variants
  size?: 'small' | 'medium' | 'large'; // Define button sizes
  isLoading?: boolean; // Add a loading state
  disable?: boolean; // Custom disable prop
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  isLoading = false,
  disable = false,
  className = '',
  onClick,
  ...props
}) => {
  // Compute dynamic class names
  const baseClass = 'px-4 py-2 rounded focus:outline-none transition-all';
  const variantClass = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  }[variant];
  const sizeClass = {
    small: 'text-sm px-3 py-1',
    medium: 'text-base px-4 py-2',
    large: 'text-lg px-5 py-3',
  }[size];
  const disabledClass = disable || isLoading ? 'opacity-50 cursor-not-allowed' : '';
  const loadingText = 'Loading...';

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${disabledClass} ${className}`}
      disabled={disable || isLoading}
      onClick={disable || isLoading ? undefined : onClick} // Prevent onClick if disabled or loading
      {...props}
    >
      {isLoading ? loadingText : children}
    </button>
  );
};

export default Button;
