import { ChangeEvent } from "react";

export type SelectValue = "asc" | "desc";

type SortSelectProps = {
  handleChange: (selectedValue: SelectValue) => void;
  selectedOption?: SelectValue;
};

export default function SortSelect({
  handleChange,
  selectedOption,
}: SortSelectProps) {
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    handleChange(event.target.value as SelectValue);
  };

  return (
    <select onChange={onChange} className="sorting-select">
      <option disabled selected={selectedOption === undefined}>
        Order...
      </option>
      <option value="asc" selected={selectedOption === "asc"}>
        Ascending
      </option>
      <option value="desc" selected={selectedOption === "desc"}>
        Descending
      </option>
    </select>
  );
}
