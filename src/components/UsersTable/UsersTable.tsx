import { useEffect, useState } from "react";
import records from "../../records.json";
import { setURLSearchParam } from "../../utils/SearchParams";
import { ORDER_URL_SEARCH_PARAM } from "../../constants/constants";
import Pagination from "../Pagination";
import User from "./User/User";
import SortSelect from "../SortSelect";
import type { Order } from "../SortSelect";
import SearchInput from "../SearchInput";

/* Types */
export type UserDataProps = (typeof records)[number];

type UserDataKeys = keyof UserDataProps;

type UsersTableProps = {
  page?: number;
  order?: Order;
};

type Filters = {
  col: keyof UserDataProps;
  value: string;
}[];

/* Constants */
const KEYS: UserDataKeys[] = Object.keys(records[0]) as UserDataKeys[];
const LENGTH = records.length;
const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

/* Util Functions */
const shouldColHaveSearchInput = (col: keyof UserDataProps) => {
  return col === "name" || col === "address" || col === "phone";
};

const shouldColHaveSelect = (col: keyof UserDataProps) => {
  return col === "date";
};

export default function UsersTable({ page, order }: UsersTableProps) {
  const isValidPage = page && page > 0 && page < LENGTH / PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(
    isValidPage ? page : FIRST_PAGE
  ); // 1-indexed
  const [data, setData] = useState(records);
  const [currentUsersData, setCurrentUsersData] = useState<UserDataProps[]>([]);
  const [sortOrder, setSortOrder] = useState<Order | undefined>(order);
  const [filters, setFilters] = useState<Filters>([]);

  // const changePage = () => {} TODO: implement this (save page number in url)

  const getStartAndEnd = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return { start, end };
  };

  const calculateCurrentUsersData = () => {
    const { start, end } = getStartAndEnd();
    setCurrentUsersData(data.slice(start, end));
  };

  const saveSortingOrderToURL = (order: Order) => {
    setURLSearchParam(ORDER_URL_SEARCH_PARAM, order);
  };

  const handleSelectSortingOrder = (order: Order) => {
    const sorted = data.sort((a, b) => {
      const date1 = Date.parse(a.date);
      const date2 = Date.parse(b.date);
      if (date1 < date2) {
        return order === "asc" ? -1 : 1;
      }
      return order === "asc" ? 1 : -1;
    });

    setData(sorted);
    calculateCurrentUsersData();

    setSortOrder(order);
    saveSortingOrderToURL(order);
  };

  const handleAddFilter = (
    col: keyof UserDataProps,
    value: string | undefined
  ): Filters => {
    const tempFilters = filters;
    const foundIndex = tempFilters.findIndex((filter) => filter.col === col);
    if (foundIndex !== -1) {
      const foundFilter = filters[foundIndex];
      foundFilter.value = value || "";

      tempFilters[foundIndex] = foundFilter;
      setFilters(tempFilters);
      return tempFilters;
    }

    const newFilter = { col: col, value: value || "" };
    setFilters([newFilter, ...tempFilters]);
    return [newFilter, ...tempFilters];
  };

  const filterData = (filters: Filters) => {
    setCurrentPage(FIRST_PAGE);

    let filtered: UserDataProps[] = records;
    filters.forEach(({ col, value }) => {
      filtered = filtered.filter((record) =>
        record[col].toLowerCase().startsWith(value.toLowerCase())
      );
    });

    const { start, end } = getStartAndEnd();
    setCurrentUsersData(filtered.slice(start, end));
    setData(filtered);

    // TODO: save in url
  };

  useEffect(() => {
    calculateCurrentUsersData();
  }, [currentPage]);

  return (
    <>
      <table>
        <thead>
          {/* TABLE HEAD (can be extracted into a dummy component) */}
          <tr className="header-row">
            <th>INDEX</th> {/* Manually adding this column */}
            {KEYS.map((key, index) => {
              if (shouldColHaveSelect(key)) {
                return (
                  <th key={index}>
                    <span>{key.toUpperCase()}</span>
                    <SortSelect
                      handleChange={handleSelectSortingOrder}
                      selectedOption={sortOrder}
                    />
                  </th>
                );
              }
              if (shouldColHaveSearchInput(key)) {
                return (
                  <th key={index}>
                    <span>{key.toUpperCase()}</span>
                    <SearchInput
                      handleOnKeyUp={(value) => {
                        const filters = handleAddFilter(key, value);
                        filterData(filters);
                      }}
                    />
                  </th>
                );
              }
              return <th key={index}>{key.toUpperCase()}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {currentUsersData.map((item) => (
            <User
              key={item.id}
              index={records.findIndex((record) => record.id === item.id) + 1}
              {...item}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        current={currentPage}
        pageSize={PAGE_SIZE}
        total={LENGTH}
        onClick={(index: number) => setCurrentPage(index)}
      />
    </>
  );
}
