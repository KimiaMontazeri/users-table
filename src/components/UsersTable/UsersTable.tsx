import { useEffect, useState } from "react";
import records from "../../records.json";
import { setURLSearchParam } from "../../utils/SearchParams";
import { ORDER_URL_SEARCH_PARAM } from "../../constants/constants";
import Pagination from "../Pagination";
import User from "./User/User";
import SortSelect from "../SortSelect";
import type { Order } from "../SortSelect";

/* Types */
export type UserDataProps = (typeof records)[number];

type UsersTableProps = {
  page?: number;
  order?: Order;
};

/* Constants */
const KEYS = Object.keys(records[0]);
const LENGTH = records.length;
const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

export default function UsersTable({ page, order }: UsersTableProps) {
  const isValidPage = page && page > 0 && page < LENGTH / PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(
    isValidPage ? page : FIRST_PAGE
  ); // 1-indexed
  const [data, setData] = useState(records);
  const [currentUsersData, setCurrentUsersData] = useState<UserDataProps[]>();
  const [sortOrder, setSortOrder] = useState<Order | undefined>(order);

  const calculateCurrentUsersData = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    setCurrentUsersData(data.slice(start, end));
  };

  const saveSortingOrderToURL = (order: Order) => {
    setURLSearchParam(ORDER_URL_SEARCH_PARAM, order);
  };

  const handleSelectSortingOrder = (order: Order) => {
    const sorted = data.sort((a, b) => {
      const date1 = Date.parse(a.date);
      const date2 = Date.parse(b.date);
      if (order === "desc") {
        return date1 > date2 ? -1 : 1;
      }
      return date1 < date2 ? -1 : 1;
    });

    setData(sorted);
    calculateCurrentUsersData();

    setSortOrder(order);
    saveSortingOrderToURL(order);
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
              if (key === "date") {
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
              return <th key={index}>{key.toUpperCase()}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {currentUsersData?.map((item) => (
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
