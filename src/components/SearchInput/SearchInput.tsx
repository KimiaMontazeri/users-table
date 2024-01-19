import { ChangeEvent, useState } from "react";

type SearchInput = {
  handleOnKeyUp: (value?: string) => void;
};

export default function SearchInput({ handleOnKeyUp }: SearchInput) {
  const [value, setValue] = useState("");

  return (
    <input
      type="search"
      className="search-input"
      placeholder="Search..."
      value={value}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value)
      }
      onKeyUp={() => handleOnKeyUp(value)}
    />
  );
}
