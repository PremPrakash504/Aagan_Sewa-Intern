const Select = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full px-4 py-3 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 ${
        disabled ? "bg-gray-100 cursor-not-allowed" : ""
      }`}
    >
      <option value="">{placeholder}</option>
      {options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;