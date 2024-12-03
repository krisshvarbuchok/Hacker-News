import FooterComponent from "../../components/Footer";
import HeaderComponent from "../../components/Header";
import BodyOpenNew from "./BodyOpenNew";
import styles from "./index.module.css";

const OpenNew = () => {
  return (
    <>
      <div className="container">
        <div className={styles.position}>
          <HeaderComponent />
          <div className={styles.aboutNew}>
            <BodyOpenNew />
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
};
export default OpenNew;
