type Option = { label: string; value: string; bold?: boolean };

type SelectProps = {
  label?: string;
  options: Option[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ label, options, error, ...props }: SelectProps) {
  return (
    <div className="relative">
      {label && <label className="font-semibold">{label}</label>}
      <select
        {...props}
        className={`appearance-none w-full px-4 py-3 pr-10 border rounded-xl bg-white
      font-inter text-sm md:text-base text-ui-text-primary
      focus:outline-none focus:ring-2
      ${
        error
          ? "border-feedbackDanger ring-red-200"
          : "border-brandPrimary ring-blue-200"
      }
    `}
      >
        {options.map(({ label, value, bold }) => (
          <option key={value} value={value} className={`${bold ? "font-bold" : ""} text-sm md:text-base`}>
            {label}
          </option>
        ))}
      </select>

      {/* Material Symbol Arrow */}
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-ui-text-secondary text-xl">
        <span className="material-symbols-outlined">expand_more</span>
      </span>
    </div>
  );
}
