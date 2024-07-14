import { Spin } from "antd";
import styles from "./loader.module.css"; // Importa los estilos

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <Spin size="large" />
    </div>
  );
};

export default Loader;
