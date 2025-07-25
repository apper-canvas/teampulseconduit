import Select from "@/components/atoms/Select"

const FilterSelect = ({ label, value, onChange, options, placeholder = "All" }) => {
  return (
    <Select
      label={label}
      value={value}
      onChange={onChange}
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  )
}

export default FilterSelect