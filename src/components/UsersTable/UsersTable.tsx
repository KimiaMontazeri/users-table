import { useEffect, useState } from "react";
import records from "../../records.json";
import Pagination from "../Pagination/Pagination";
import User from "./User/User";

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
  const [currentUsersData, setCurrentUsersData] = useState<UserDataProps[]>();

  useEffect(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    setCurrentUsersData(records.slice(start, end));
  }, [currentPage]);

  return (
    <>
      <table>
        <thead>
          <tr className="header-row">
            <th>INDEX</th>
            {KEYS.map((key, index) => (
              <th key={index}>{key.toUpperCase()}</th>
            ))}
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
