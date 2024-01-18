import { useEffect, useState } from "react";
import records from "../../records.json";
import Pagination from "../Pagination";
import User from "./User/User";
import SortSelect from "../SortSelect";
import type { SelectValue } from "../SortSelect";

/* Types */
export type UserDataProps = (typeof records)[number];

/* Constants */
const KEYS = Object.keys(records[0]);
const LENGTH = records.length;
const FIRST_PAGE = 1;
const PAGE_SIZE = 10;

export default function UsersTable({ page }: { page?: number }) {
  const isPageValid = page && page > 0 && page < LENGTH / PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(
    isPageValid ? page : FIRST_PAGE
  ); // 1-indexed
  const [data, setData] = useState(records);
  const [currentUsersData, setCurrentUsersData] = useState<UserDataProps[]>();

  const calculateCurrentUsersData = () => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    setCurrentUsersData(data.slice(start, end));
  };

  const handleSelectSortingCriteria = (selectedValue: SelectValue) => {
    const sorted = data.sort((a, b) => {
      const date1 = Date.parse(a.date);
      const date2 = Date.parse(b.date);
      if (selectedValue === "desc") {
        return date1 > date2 ? -1 : 1;
      }
      return date1 < date2 ? -1 : 1;
    });
    console.log({ sorted });
    setData(sorted);
    calculateCurrentUsersData();
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
                    <SortSelect handleChange={handleSelectSortingCriteria} />
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
