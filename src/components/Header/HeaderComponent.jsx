import { useDispatch } from "react-redux";
import { fetchGetListRefresh } from "../../redux/slices/ListSlice";
import { useNavigate } from "react-router-dom";
import styles from "./headerComponent.module.css"
import { useEffect } from "react";


function HeaderComponent() {
    const dispach = useDispatch();
    const navigate = useNavigate();

    const handleRefresh = () => {
        console.log('click');
        dispach(fetchGetListRefresh());
        navigate('/');
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

        // Удаляем обработчик скролла при размонтировании компонента
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
                    <button className={styles.button} onClick={handleRefresh}>Fresh news</button>
                </div>
            </nav>
        </header>
    );
}
export default HeaderComponent;