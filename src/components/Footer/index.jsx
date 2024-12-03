import styles from "./index.module.css";
import { Typography } from "@mui/material";
import Link from "@mui/material/Link";

const FooterComponent = () => {
  return (
    <footer className="container">
      <div className={styles.footer}>
        <Typography
          className={styles.info}
          align="center"
          sx={{
            
            fontSize: {
              xs: "12px",
              sm: "14px",
              md: "16px",
            },
          }}
        >
          This app utilizes information from 
          <Link
            href="https://github.com/HackerNews/API"
            underline="none"
            sx={{pl: '5px', pr: '5px', color: 'gray'}}
          >
            Hacker News API 
          </Link>
          to ensure up-to-date and reliable content.
        </Typography>
      </div>
    </footer>
  );
};
export default FooterComponent;
