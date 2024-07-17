import styles from "./homePage.module.css";
import { Button } from "antd";

const HomePage = () => {
  return (
    <section className={styles.containerHome}>
      <img
        style={{
          zIndex: 10,
          width: "100%",
          maxWidth: 800,
          position: "relative",
        }}
        src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*zx7LTI_ECSAAAAAAAAAAAABkARQnAQ"
        alt="img"
      />
      <Button type="primary" href="/lista-usuarios">
        Ver lista de usuarios
      </Button>
    </section>
  );
};

export default HomePage;
