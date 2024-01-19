import { ChangeEvent, useState } from "react";
import type { SearchInputProps } from "./SearchInput.types";

export default function SearchInput({ handleOnKeyUp }: SearchInputProps) {
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
