type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'danger' | 'neutral';
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({ children, variant = 'success', disabled = false, ...props }: ButtonProps) {
  const base = 'px-6 py-2 rounded font-semibold transition-all';
  const styles = {
    primary: 'bg-[#004D61] text-white hover:bg-black',
    success: 'bg-green-600 text-white hover:bg-black',
    danger: 'bg-red-600 text-white hover:bg-black',
    neutral: 'bg-gray-300 text-black hover:bg-black',
  };

  const finalStyle = disabled
    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
    : styles[variant];

  return (
    <button className={`${base} ${finalStyle}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
