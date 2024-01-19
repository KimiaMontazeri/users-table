import { UserDataProps } from ".";

export const shouldColHaveSearchInput = (col: keyof UserDataProps) => {
  return col === "name" || col === "address" || col === "phone";
};

export const shouldColHaveSelect = (col: keyof UserDataProps) => {
  return col === "date";
};
