import type { ChangeEvent } from "react";
import type { Order, SortSelectProps } from "./SortSelect.types";
import "./SortSelect.css";

export default function SortSelect({
  handleChange,
  selectedOption,
}: SortSelectProps) {
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    handleChange(event.target.value as Order);
  };

  return (
    <select
      onChange={onChange}
      defaultValue={selectedOption || "default"}
      className="sorting-select"
    >
      <option disabled value="default">
        Order...
      </option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  );
}
