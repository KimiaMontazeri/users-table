import records from "../../records.json";
import type { Order } from "../SortSelect";

export type UserDataProps = (typeof records)[number];

export type UserDataKeys = keyof UserDataProps;

export type UsersTableProps = {
  page?: number;
  order?: Order;
  name?: string;
  address?: string;
  phone?: string;
};

export type Filters = {
  col: keyof UserDataProps;
  value: string;
}[];
