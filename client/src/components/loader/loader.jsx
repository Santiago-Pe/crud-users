import styles from "./loader.module.css";

import { Spin } from "antd";

const Loader = ({ hasOpacity = true }) => {
  return (
    <div
      className={`${styles.overlay} ${
        hasOpacity ? styles.opacity : styles.noOpacity
      }`}
    >
      <Spin size="large" />
    </div>
  );
};

export default Loader;
