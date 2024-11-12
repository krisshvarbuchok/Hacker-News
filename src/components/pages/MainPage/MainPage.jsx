import { useDispatch, useSelector } from "react-redux";
import styles from "./mainPage.module.css";
import getTime from "../../../helpers/getTime";
import { useNavigate } from "react-router-dom";
import { cleverComments, fetchGetInfoAboutComments } from "../../../redux/slices/ListSlice";
import { setOpenNew } from "../../../redux/slices/OpenNewSlice";
import { setPage } from "../../../redux/slices/PagesSlice";
import { Box, Skeleton, Stack } from "@mui/material";

const LIMIT = 100;


const MainPage = () => {
    const { info } = useSelector(state => state.list);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const itemsPerPage = 30;
    const page = useSelector(state => state.page);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = info.slice(startIndex, endIndex);
    const totalPages = Math.ceil(LIMIT / itemsPerPage);


    const handleOpen = (item) => {
        try {
            dispatch(cleverComments())
            dispatch(setOpenNew(item));
            if (item.kids) item.kids.forEach(item => {
                dispatch(fetchGetInfoAboutComments(item))
            });
            navigate('/openNew');
        }
        catch(err){
            console.log(err.message); 
        }  
    }


    return (
        <>
            <main className='container'>
                <section className={styles.list}>
                    <ul>
                        {info.length === 100 ?
                            currentItems.map((item) => {
                                return <li key={item.id} className={styles.item}>

                                    <p className={styles.title} onClick={() => handleOpen(item)}>{item.title} </p>

                                    <div className={styles.info}>
                                        <p>Autor: {item.by}</p>
                                        <p>|</p>
                                        <p>Published: {getTime(item.time)}</p>
                                        <p>|</p>
                                        <p>Rating: {item.score} </p>
                                    </div>

                                </li>
                            })
                            :
                            <Box>
                                {[...Array(10)].map((_, index) => (
                                    <Stack key={index} sx={{ pt: '20px', ml: '30px' }}>
                                        <Skeleton width="70%" height="18px" />
                                        <Skeleton width="90%" height="16px" />
                                        <Skeleton width="40%" height="16px" />
                                    </Stack>
                                ))}
                            </Box>

                        }
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
};
export default MainPage;