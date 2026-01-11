import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./BookingForm.module.css";
import Notification from "../Notification/Notification";

const BookingForm = () => {
  const [startDate, setStartDate] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setShowNotification(true);

    setStartDate(null);
    e.target.reset();
  };

  return (
    <div className={styles.bookingCard}>
      {showNotification && (
        <Notification
          message="Booking successful! We will contact you soon."
          onClose={() => setShowNotification(false)}
        />
      )}

      <h3 className={styles.formTitle}>Book your campervan now</h3>
      <p className={styles.formSubtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name*"
          className={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Email*"
          className={styles.input}
          required
        />

        <div className={styles.datePickerWrapper}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            placeholderText="Booking date*"
            className={styles.input}
            dateFormat="dd.MM.yyyy"
            minDate={new Date()}
            required
            onFocus={(e) => (e.target.readOnly = true)}
            onBlur={(e) => (e.target.readOnly = false)}
          />
        </div>

        <textarea placeholder="Comment" className={styles.textarea}></textarea>

        <button type="submit" className={styles.sendBtn}>
          Send
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
