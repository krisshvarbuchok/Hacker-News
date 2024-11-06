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
        date = new Date(open.time);
        console.log(date.getDate(), date.getMonth(), date.getFullYear());

    } catch (err) {
        console.log(err.message);
        return <div className={styles.warning} >There isn`t this new</div>
    }
    //if (Object.keys(open) === 0) throw new Error;

    return (
        <>
            <div>
                <div className={styles.title}>
                    {open.title}
                </div>
                <a href={`${open.url}`} target="_blank" >
                    Read more
                </a>
                <div >
                    {date.getDate()} , {date.getMonth()} , {date.getFullYear()}
                </div>
                <div>{open.by}</div>
                <div>{open.descendants !== 0 ? open.kids.length : 0}</div>
            </div>
            {open.descendants > 0 ? <Comments /> : 'no comments'}
        </>
    )
}
export default BodyOpenNew;