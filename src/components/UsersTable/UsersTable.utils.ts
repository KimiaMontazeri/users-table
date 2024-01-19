import { setURLSearchParam } from "../../utils/SearchParams";
import { ORDER_URL_SEARCH_PARAM } from "../../constants/constants";
import type { UserDataProps } from ".";
import type { Order } from "../SortSelect";
import type { Filters } from "./UsersTable.types";

export const shouldColHaveSearchInput = (col: keyof UserDataProps) => {
  return col === "name" || col === "address" || col === "phone";
};

export const shouldColHaveSelect = (col: keyof UserDataProps) => {
  return col === "date";
};

export const saveSortingOrderToURL = (order: Order) => {
  setURLSearchParam(ORDER_URL_SEARCH_PARAM, order);
};

export const saveFiltersToURL = (filters: Filters) => {
  filters.forEach(({ key, value }) => {
    if (value) {
      setURLSearchParam(key, value);
    }
  });
};
