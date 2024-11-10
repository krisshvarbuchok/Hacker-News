import { useDispatch, useSelector } from "react-redux";
import { memo } from "react";
import styles from "./mainPage.module.css";
import getTime from "../../../helpers/getTime";
import { useNavigate } from "react-router-dom";
import { cleverComments, fetchGetInfoAboutComments } from "../../../redux/slices/ListSlice";
import { setOpenNew } from "../../../redux/slices/OpenNewSlice";
import { setPage } from "../../../redux/slices/PagesSlice";

const LIMIT = 100;


const MainPage = memo(() => {
    const { info } = useSelector(state => state.list);
   // console.log('info! loof length', info);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const itemsPerPage = 30;
    const page = useSelector(state => state.page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = info.slice(startIndex, endIndex);
    const totalPages = Math.ceil(LIMIT / itemsPerPage);


    const handleOpen = (item) =>{
        dispatch(cleverComments())
        dispatch(setOpenNew(item));
        if(item.kids)item.kids.forEach(item => {
            dispatch(fetchGetInfoAboutComments(item))
        });
        navigate('openNew');
    }

    return (
        <>

            <main className='container'>
                <section className={styles.list}>
                    <ul>
                        {currentItems.map((item) => {
                            return <li key={item.id} className={styles.item}>

                                <p className={styles.title} onClick={() => handleOpen(item)}>{item.title} </p>

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
                    <div className={styles.page}>
                        {info.length !== 0 &&
                            <button onClick={() => dispatch(setPage(page - 1))}
                                className={styles.pageButton}
                                disabled={page === 1}
                            >{'<'}</button>}
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
                        {info.length !== 0 &&
                            <button onClick={() => dispatch(setPage(page + 1))}
                                className={styles.pageButton}
                                disabled={page === totalPages}
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