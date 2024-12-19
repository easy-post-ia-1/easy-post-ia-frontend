import { ChangeEvent, useState } from 'react';

function usePaginationItemSize() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const handlePageChange = (_: ChangeEvent<unknown>, value: number) => setCurrentPage(value);

  return {
    currentPage,
    nextPage,
    prevPage,
    handlePageChange,
  };
}

export default usePaginationItemSize;
