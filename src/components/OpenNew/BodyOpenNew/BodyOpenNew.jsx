import { useSelector } from "react-redux";
import styles from "./bodyOpenNew.module.css";
import Comments from "./Comments/Comments";

const BodyOpenNew = () => {
    let date;
    const open = useSelector(state => state.open);
    console.log(open);

    try {
        if (Object.keys(open).length === 0) throw new Error;
        console.log(open.time);
        date = new Date(open.time * 1000);
        console.log(date.getHours(), date.getMinutes());

    } catch (err) {
        console.log(err.message);
        return <div className={styles.warning} >
            <p>There isn`t a new.</p>
            <div>
                <img className={styles.img}
                    alt='empty'
                    src={`/empty.svg`}
                />
            </div>

        </div>
    }

    return (
        <>
            <div className={styles.body}>
                <div className={styles.title}>
                    {open.title}
                </div>
                <a href={`${open.url}`} target="_blank" >
                    Read more
                </a>
                <div className={styles.info}>
                    <div className={styles.autor}>
                        <p>Autor:</p>
                        <p className={styles.by}>{open.by}</p>
                    </div>
                    <div >
                        Published: {date.getHours()}:{date.getMinutes()}, date: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}
                    </div>
                    <div className={styles.comments}>
                        <p>Number of comments</p>
                        {open.descendants !== 0 ?
                            <p> {open.kids.length}</p> :
                            <p>0</p>
                        }</div>
                </div>
                {open.descendants > 0 ? <Comments /> :
                    <div className={styles.warning} >
                        <p>No comments</p>
                        <div>
                            <img className={styles.img}
                                alt='empty'
                                src={`/empty.svg`}
                            />
                        </div>

                    </div>}
            </div>
        </>
    )
}
export default BodyOpenNew;