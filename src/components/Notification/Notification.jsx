import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Notification.module.css";

const Notification = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className={`${styles.notification} ${styles[type]}`}>
      <p>{message}</p>
      <button onClick={onClose} className={styles.closeBtn}>
        &times;
      </button>
    </div>,
    document.body
  );
};

export default Notification;
