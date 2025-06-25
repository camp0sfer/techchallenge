type Option = { label: string; value: string; bold?: boolean };

type SelectProps = {
  label?: string;
  options: Option[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ label, options, error, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1 text-sm font-inter">
      {label && <label className="font-medium">{label}</label>}
      <select
        {...props}
        className={`border px-4 py-3 rounded focus:outline-none focus:ring-2 appearance-none bg-white ${
          error
            ? 'border-red-500 ring-red-200'
            : 'border-green-600 ring-green-200'
        }`}
      >
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
