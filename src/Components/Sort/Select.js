import React from "react"

const Select = ({ options, defaultValue, value, onChange, sort }) => {
  const sortFunc = () => {
    // sort(value)
    console.log("hi")
  }

  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      <option disabled>{defaultValue}</option>
      {options.map((option) => (
        <option
          value={option.value}
          key={option.value}
          onClick={() => sortFunc()}
        >
          {option.name}
        </option>
      ))}
    </select>
  )
}

export default Select
