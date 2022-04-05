import React, { FC } from "react";
import styles from "./styles.module.css";

interface IProps {
  message?: string;
}

const Loader: FC<IProps> = ({ message }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.loader_wrap}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" fill="#ff8a00" />
          <rect y="24" width="20" height="20" fill="#e5e5e5" />
          <rect x="24" width="20" height="20" fill="#e5e5e5" />
          <path d="M24 24H44V44H24V24Z" fill="#e5e5e5" />
        </svg>
        <div className={styles.loader_text}>{message}</div>
      </div>
    </div>
  );
};

Loader.defaultProps = {
  message: "Loading...",
};

export default Loader;
