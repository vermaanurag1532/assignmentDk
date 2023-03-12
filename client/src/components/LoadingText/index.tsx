import React from "react";

import styles from "./loading.module.css";

interface IProps {
  loading: boolean;
}

const Loading: React.FC<IProps> = ({ loading }) => {
  if (!loading) return null;

  return <p className={styles["loading-text"]}>Loading...</p>;
};

export default Loading;
