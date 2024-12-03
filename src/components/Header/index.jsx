import { useDispatch, useSelector } from "react-redux";
import { fetchGetListRefresh } from "../../redux/slices/ListSlice";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css"
import { useEffect } from "react";
import ComeBack from "../../pages/OpenNew/ComeBack";
import { cleverOpenNew } from "../../redux/slices/OpenNewSlice";
import { setPage } from "../../redux/slices/PagesSlice";


function HeaderComponent() {
    const dispach = useDispatch();
    const navigate = useNavigate();
    const { open } = useSelector(state => state.open);

    const handleRefresh = () => {
        try {
            dispach(fetchGetListRefresh());
            navigate('/');
            dispach(cleverOpenNew());
            dispach(setPage(1));
        } 
        catch(err){
            console.log(err.message);
        }
    }
    useEffect(() => {
        const handleScroll = () => {
            const header = document.querySelector(`.${styles.header}`);
            if (window.scrollY > 50) {
                header.classList.add(styles.scrolled);
            } else {
                header.classList.remove(styles.scrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);

      
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={styles.header}>
            <nav className="container">
                <div className={styles.refresh}>
                    <div className={styles.imgContainer}>
                        <img className={styles.img}
                            alt='logo'
                            src={`/news.svg`}
                        />
                    </div>
                    {Object.keys(open).length !== 0 && <div className={styles.comeBack}><ComeBack /></div>}
                    <button className={styles.button} onClick={handleRefresh}>Fresh news</button>
                </div>
            </nav>
        </header>
    );
}
export default HeaderComponent;