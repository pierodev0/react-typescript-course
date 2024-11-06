const variantStyles = {
  base: 'py-3 px-10 text-lg font-bold text-white cursor-pointer rounded-md',
  variants: {
    primary: 'hover:bg-orange-500 bg-orange-400',
    secondary: 'hover:bg-gray-600 bg-gray-500',
    destructive: 'bg-red-500 hover:bg-red-600',
  },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive';
}

function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={`${variantStyles.base} ${variantStyles.variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
