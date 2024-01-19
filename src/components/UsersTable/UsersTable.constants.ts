import records from "../../records.json";
import { UserDataKeys } from "./UsersTable.types";

export const KEYS: UserDataKeys[] = Object.keys(records[0]) as UserDataKeys[];
export const LENGTH = records.length;
export const FIRST_PAGE = 1;
export const PAGE_SIZE = 10;
