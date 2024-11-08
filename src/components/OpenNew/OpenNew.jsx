import FooterComponent from "../Footer/FooterComponent";
import HeaderComponent from "../Header/HeaderComponent";
import BodyOpenNew from "./BodyOpenNew/BodyOpenNew";
import styles from "./openNew.module.css";

const OpenNew = () => {

    return (

        <>
            <div className="container">

                <HeaderComponent />
                <div className={`${styles.aboutNew} ${styles.mainContainer}`}>
                    <BodyOpenNew />
                </div>
            </div>
            <FooterComponent />
        </>
    )
}
export default OpenNew;