import { useState } from "react"

export const usePagination = (itemsPerPage: number = 10) => {
    const [currentPage, setCurrentPage] = useState(1);

    const goToPage = (page: number) => setCurrentPage(page);
    const nextPage = () => setCurrentPage((prev)=>prev+1);
    const prevPage = () => setCurrentPage((prev)=> Math.max(prev -1, 1));


  const paginate = <T,>(data: T[]): T[] => {
    const start = (currentPage - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  };

  return {currentPage, goToPage, nextPage, prevPage, paginate}
}