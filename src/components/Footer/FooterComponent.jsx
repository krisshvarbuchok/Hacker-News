import styles from './footerComponent.module.css';

const FooterComponent = () => {


    return (
        <footer className="container">
            <div className={styles.footer}>
                <p className={styles.info}>
                    This app utilizes information from <a href='https://github.com/HackerNews/API'>Hacker News API</a> to ensure up-to-date and reliable content.
                </p>
            </div>
        </footer>
    )
}
export default FooterComponent;