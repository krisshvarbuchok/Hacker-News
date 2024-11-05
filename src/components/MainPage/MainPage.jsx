import { useSelector } from "react-redux";
import { memo, useState } from "react";
import styles from "./mainPage.module.css";
import getTime from "../../helpers/getTime";
import { useNavigate } from "react-router-dom";

const LIMIT = 100;


const MainPage = memo(() => {
    const { info } = useSelector(state => state.list);
    //console.log(info);
    const navigate = useNavigate();

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = info.slice(startIndex, endIndex);
    const totalPages = Math.ceil(LIMIT / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleOpen = () =>{
        navigate('openNew')
    }

    return (
        <>

            <main className='container'>
                <section className={styles.list}>
                    <ul>
                        {currentItems.map((item) => {
                            return <li key={item.id} className={styles.item}>

                                <p className={styles.title} onClick={() => handleOpen()}>{item.title} </p>

                                <div className={styles.info}>
                                    <p className={styles.by}>Autor: {item.by}</p>
                                    <p>|</p>
                                    <p className={styles.time}>Published: {getTime(item.time)}</p>
                                    <p>|</p>
                                    <p className={styles.score}>Rating: {item.score} </p>
                                </div>

                            </li>
                        })}
                    </ul>
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
                </section>
            </main >
        </>
    )
}, (prevProps, nextProps) => {
    const prevData = prevProps.info || [];
    const nextData = nextProps.info || [];
    const sortedPrev = [...prevData].sort((a, b) => a.id - b.id);
    const sortedNext = [...nextData].sort((a, b) => a.id - b.id);

    return sortedPrev.every((value, index) => value.id === sortedNext[index].id);

});
export default MainPage;