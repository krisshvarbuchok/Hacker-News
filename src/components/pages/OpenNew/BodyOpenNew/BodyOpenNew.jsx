import { useDispatch, useSelector } from "react-redux";
import styles from "./bodyOpenNew.module.css";
import Comments from "./Comments/Comments";
import RefreshIcon from '@mui/icons-material/Refresh';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { fetchGetInfoAboutComments } from "../../../../redux/slices/ListSlice";
import { fetchUpdateOpenNew } from "../../../../redux/slices/OpenNewSlice";



const BodyOpenNew = () => {
    const [loading, setLoading] = useState(false);
    const { statusNew } = useSelector(state => state.open);

    let date;
    const { open } = useSelector(state => state.open);

    const dispatch = useDispatch();

    try {
        if (Object.keys(open).length === 0) throw new Error('The new is out of date');
        date = new Date(open.time * 1000);
    } catch (err) {
        console.log(err.message);
        return <div className={styles.warning} >
            <p>There isn`t a new. Refresh news.</p>
            <div>
                <img className={styles.img}
                    alt='empty'
                    src={`/empty.svg`}
                />
            </div>
        </div>
    }

    useEffect(() => {
        if (statusNew === 'loading') setLoading(true);
        else setLoading(false);
    }, [statusNew]);



    useEffect(() => {
        if (open.kids) {
            open.kids.forEach((item) => {
                dispatch(fetchGetInfoAboutComments(item)).then(() => {

                });
            });
        }
    }, [open, dispatch]);


    const handleRefreshComm = () => {
        dispatch(fetchUpdateOpenNew(open.id));
    };



    return (
        <>
            <div className={styles.body}>
                <div className={styles.title}>
                    {open.title}
                </div>
                <div>
                    <a href={`${open.url}`} target="_blank" >
                        Read more
                    </a>
                </div>
                <div className={styles.info}>
                    <div className={styles.autor}>
                        <p>Autor:</p>
                        <p className={styles.by}>{open.by}</p>
                    </div>
                    <div >
                        Published: {date.getHours().toString().padStart(2, "0")}:{date.getMinutes().toString().padStart(2, "0")}, date: {date.getDate().toString().padStart(2, "0")}.{(date.getMonth() + 1).toString().padStart(2, "0")}.{date.getFullYear()}
                    </div>
                    <div className={styles.comments}>
                        <p>Number of comments</p>
                        {open.descendants !== 0 ?
                            <p> {open.kids.length}</p> :
                            <p>0</p>
                        }
                        <Box sx={{ '& > button': { m: 0, p: 0 } }} >
                            <LoadingButton
                                onClick={() => handleRefreshComm()}
                                loading={loading}
                                sx={{
                                    '& .MuiButton-endIcon': {

                                        marginRight: '0px',
                                        marginLeft: '0px',
                                    },
                                    borderRadius: '50%',
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: 'transparent',
                                    color: 'black',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: '#ff6600',
                                    },
                                    '&:active': {
                                        backgroundColor: 'transparent',
                                        border: 'none',
                                        boxShadow: 'none',
                                    },
                                }}
                                endIcon={<RefreshIcon />}
                            >
                            </LoadingButton >
                        </Box>
                    </div>
                </div>

                {open.descendants === 0 ?
                    <div className={styles.withoutComm} >
                        <p>No comments</p>
                        <div>
                            <img className={styles.img}
                                alt='empty'
                                src={`/empty.svg`}
                            />
                        </div>
                    </div>
                    :
                    <Comments kidsIds={open.kids} />
                }
            </div>
        </>
    )
}
export default BodyOpenNew;