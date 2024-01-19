import { useEffect, useState } from "react";
import records from "../../records.json";
import Pagination from "../Pagination";
import User from "./User";
import SortSelect from "../SortSelect";
import type { Order } from "../SortSelect";
import SearchInput from "../SearchInput";
import Stack from "../Stack";
import type {
  Filter,
  Filters,
  UserDataKeys,
  UserDataProps,
  UsersTableProps,
} from "./UsersTable.types";
import { FIRST_PAGE, KEYS, LENGTH, PAGE_SIZE } from "./UsersTable.constants";
import {
  saveFiltersToURL,
  savePageNumberToURL,
  saveSortingOrderToURL,
  shouldColHaveSearchInput,
  shouldColHaveSelect,
} from "./UsersTable.utils";
import "./UsersTable.css";

export default function UsersTable({
  page,
  order,
  name = "",
  address = "",
  phone = "",
}: UsersTableProps) {
  const isValidPage = page && page > 0 && page < LENGTH / PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(
    isValidPage ? page : FIRST_PAGE
  ); // 1-indexed
  const [data, setData] = useState(records);
  const [currentUsersData, setCurrentUsersData] = useState<UserDataProps[]>([]);
  const [filters, setFilters] = useState<Filters>([]);

  const getDefaultSearchValue = (key: UserDataKeys) => {
    switch (key) {
      case "name":
        return name;
      case "address":
        return address;
      case "phone":
        return phone;
      default:
        return "";
    }
  };

  const changePage = (page: number) => {
    setCurrentPage(page);
    savePageNumberToURL(page);
  };

  const getStartAndEnd = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    return { start, end };
  };

  const calculateCurrentUsersData = () => {
    const { start, end } = getStartAndEnd();
    setCurrentUsersData(data.slice(start, end));
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

    saveSortingOrderToURL(order);
  };

  const handleAddFilters = (newFilters: Filters): Filters => {
    const oldFilters = filters;

    newFilters.forEach((filter) => {
      const foundIndex = oldFilters.findIndex((f) => f.key === filter.key);
      if (foundIndex !== -1) {
        const foundFilter = filters[foundIndex];
        foundFilter.value = filter.value || "";
        oldFilters[foundIndex] = foundFilter; // update
      } else {
        const newFilter: Filter = {
          key: filter.key,
          value: filter.value || "",
        };
        oldFilters.push(newFilter); // update
      }
    });

    setFilters(oldFilters);
    return oldFilters;
  };

  const filterData = (filters: Filters) => {
    changePage(FIRST_PAGE);

    let filtered: UserDataProps[] = records;
    filters.forEach(({ key, value }) => {
      filtered = filtered.filter((record) =>
        record[key].toLowerCase().startsWith(value?.toLowerCase() || "")
      );
    });

    const { start, end } = getStartAndEnd();
    setCurrentUsersData(filtered.slice(start, end));
    setData(filtered);

    saveFiltersToURL(filters);
  };

  useEffect(() => {
    calculateCurrentUsersData();
  }, [currentPage]);

  /* Syncs the rendered data with URL search params */
  useEffect(() => {
    if (order) {
      handleSelectSortingOrder(order);
    }

    const newFilters = handleAddFilters([
      { key: "name", value: name },
      { key: "address", value: address },
      { key: "phone", value: phone },
    ]);
    filterData(newFilters);
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr className="header-row">
            <th>INDEX</th> {/* Manually adding this column */}
            {KEYS.map((key, index) => {
              if (shouldColHaveSelect(key)) {
                return (
                  <th key={index}>
                    <Stack>
                      <span>{key.toUpperCase()}</span>
                      <SortSelect
                        handleChange={handleSelectSortingOrder}
                        selectedOption={order}
                      />
                    </Stack>
                  </th>
                );
              }
              if (shouldColHaveSearchInput(key)) {
                return (
                  <th key={index}>
                    <Stack>
                      <span>{key.toUpperCase()}</span>
                      <SearchInput
                        defaultValue={getDefaultSearchValue(key)}
                        handleOnKeyUp={(value) => {
                          const filters = handleAddFilters([
                            { key: key, value: value },
                          ]);
                          filterData(filters);
                        }}
                      />
                    </Stack>
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
        onClick={(index: number) => changePage(index)}
      />
    </>
  );
}
