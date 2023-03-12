import React from "react";
import styles from "./errorText.module.css";

interface ErrorTextProps {
  error: any;
}

const ErrorText: React.FC<ErrorTextProps> = ({ error }) => {
  if (!error) return null;

  if (typeof error === "string") {
    return <p className={styles["error-text"]}>{error}</p>;
  }

  return (
    <p className={styles["error-text"]}>
      {error?.message || "Something went wrong"}
    </p>
  );
};

export default ErrorText;
