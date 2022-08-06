import React from "react";
import "react-multi-date-picker/styles/colors/green.css";
import { Calendar } from "react-multi-date-picker";
import { useGlobalState } from "../context/stateContext";

// FUTURE FEATURE: Implement Unavailabilities
export function ChargerCalendar({ dates, setDates }) {
  const { store } = useGlobalState();
  const { bookingDates } = store;

  const handleCalendar = (date) => {
    setDates(...bookingDates, date);
  };

  return (
    <Calendar
      className="green"
      multiple
      value={dates}
      onChange={handleCalendar}
      minDate={new Date()}
    />
  );
}
