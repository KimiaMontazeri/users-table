import { ChangeEvent } from "react";

export type Order = "asc" | "desc";

type SortSelectProps = {
  handleChange: (selectedValue: Order) => void;
  selectedOption?: Order;
};

export default function SortSelect({
  handleChange,
  selectedOption,
}: SortSelectProps) {
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    handleChange(event.target.value as Order);
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
