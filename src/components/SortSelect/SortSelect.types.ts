export type Order = "asc" | "desc";

export type SortSelectProps = {
  handleChange: (selectedValue: Order) => void;
  selectedOption?: Order;
};
