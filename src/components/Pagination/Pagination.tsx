import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={(event) => onPageChange(event.selected + 1)}
      containerClassName={styles.pagination}
      pageClassName=""
      pageLinkClassName=""
      previousClassName=""
      previousLinkClassName=""
      nextClassName=""
      nextLinkClassName=""
      breakClassName=""
      breakLinkClassName=""
      activeClassName={styles.active}
      previousLabel={"←"}
      nextLabel={"→"}
      disableInitialCallback={true}
    />
  );
}
