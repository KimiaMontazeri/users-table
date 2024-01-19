import type { PaginationProps } from "./Pagination.types";
import "./Pagination.css";

export default function Pagination({
  current,
  pageSize,
  total,
  onClick,
}: PaginationProps) {
  const renderPageBlock = (index: number, text?: string) => {
    const pages = Math.ceil(total / pageSize);

    return typeof index !== "number" || index < 1 || index > pages ? (
      <span
        key={`page_${index}`}
        className="pagination-block pagination-block-disabled"
      >
        {text || index}
      </span>
    ) : (
      <span
        key={`page_${index}`}
        className="pagination-block"
        onClick={() => onClick(index)}
      >
        {text || index}
      </span>
    );
  };

  const renderMiddleElements = () => {
    const pages = Math.ceil(total / pageSize);

    let middleElements = [renderPageBlock(current)];
    const leftSideSize = current - 2 <= 0 ? 1 : current - 2;

    for (let i = current; i > leftSideSize; i--) {
      middleElements = [renderPageBlock(i - 1), ...middleElements];
    }

    const rightSideSize = current + 2 > pages ? pages : current + 2;

    for (let i = current; i < rightSideSize; i++) {
      middleElements = [...middleElements, renderPageBlock(i + 1)];
    }

    return (
      <>
        {current - 3 >= 1 && renderPageBlock(1)}
        {current - 3 > 1 && renderPageBlock(-1, "...")}
        {...middleElements}
        {current + 3 < pages && renderPageBlock(-2, "...")}
        {current + 3 <= pages && renderPageBlock(pages)}
      </>
    );
  };

  return (
    <div className="pagination-container">
      {renderPageBlock(current - 1, "＜")}
      {renderMiddleElements()}
      {renderPageBlock(current + 1, "＞")}
    </div>
  );
}
