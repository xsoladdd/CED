import { useState } from "react";

export const usePagination = (itemsPerPage = 10) => {
  const [page, setPage] = useState(1);
  const [pageOffset, setPageOffset] = useState(0);
  const handleNext = (listCount: number | undefined) => {
    if (listCount && listCount === itemsPerPage) {
      setPageOffset(pageOffset + itemsPerPage);
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    console.log(page);
    if (page !== 1) {
      setPageOffset(pageOffset - itemsPerPage);
      setPage(page - 1);
    }
  };

  const resetPagination = () => {
    setPage(1);
    setPageOffset(0);
  };
  return {
    page,
    pageOffset,
    itemsPerPage,
    handleNext,
    handleBack,
    resetPagination,
  };
};
