import { useSelector } from "react-redux";
import { memo, useState } from "react";
import styles from "./mainPage.module.css";
import getTime from "../helpers/getTime";

const LIMIT = 100;


const MainPage = memo(() => {
    const { info } = useSelector(state => state.list);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = info.slice(startIndex, endIndex);
    const totalPages = Math.ceil(LIMIT / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <ul>
                <div>
                    {currentItems.map((item) => {
                        return <li key={item.id}>
                            <p>{item.by}</p>
                            <p>{item.title} </p>
                            <p>{getTime(item.time)}</p>
                            <p>{item.score}</p>
                        </li>
                    })}

                    <div className="page">
                        {info.length !== 0 &&
                            <button onClick={() => handlePageChange(currentPage - 1)}
                                className="pageButton"
                                disabled={currentPage === 1}
                            >{'<'}</button>}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                className="pageButton"
                                onClick={() => handlePageChange(index + 1)}
                                disabled={currentPage === index + 1}
                            >
                                {index + 1}
                            </button>

                        ))}
                        {info.length !== 0 &&
                            <button onClick={() => handlePageChange(currentPage + 1)}
                                className="pageButton"
                                disabled={currentPage === totalPages}
                            >{'>'}</button>}
                    </div>
                </div>

                {/* {info.map(item => {
                    return <li key={item.id}>
                        {item.title}
                    </li>
                })} */}



            </ul>
        </>
    )
},(prevProps, nextProps) => {
    const prevData = prevProps.info || [];
    const nextData = nextProps.info || [];
    const sortedPrev = [...prevData].sort((a, b) => a.id - b.id);
    const sortedNext = [...nextData].sort((a, b) => a.id - b.id);

    return sortedPrev.every((value, index) => value.id === sortedNext[index].id);

});
export default MainPage;