type InputProps = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1 text-sm font-inter">
      {label && <label className="font-medium">{label}</label>}
      <input
        {...props}
        className={`border px-4 py-3 rounded focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 ring-red-200'
            : 'border-green-600 ring-green-200'
        }`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
