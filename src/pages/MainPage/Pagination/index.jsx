import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../redux/slices/PagesSlice";
import { totalPages } from "..";
import styles from "./index.module.css";

const PaginationComponent = () => {
  const { info } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);

  return (
    <div className={styles.page}>
      {info.length !== 0 && (
        <button
          onClick={() => dispatch(setPage(page - 1))}
          className={styles.pageButton}
          disabled={page === 1}
        >
          {"<"}
        </button>
      )}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={styles.pageButton}
          onClick={() => dispatch(setPage(index + 1))}
          disabled={page === index + 1}
        >
          {index + 1}
        </button>
      ))}
      {info.length !== 0 && (
        <button
          onClick={() => dispatch(setPage(page + 1))}
          className={styles.pageButton}
          disabled={page === totalPages}
        >
          {">"}
        </button>
      )}
    </div>
  );
};
export default PaginationComponent;
