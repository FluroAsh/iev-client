import React from "react";
import "react-multi-date-picker/styles/colors/green.css";
import { Calendar } from "react-multi-date-picker";
import { useGlobalState } from "../context/stateContext";

export function ChargerCalendar({ dates, setDates }) {
  const { store } = useGlobalState();
  const { bookingDates } = store;

  const handleCalendar = (date) => {
    setDates(...bookingDates, date);

    // dispatch({
    //   type: "setBookingDates",
    //   data: dates,
    // });
  };

  console.log(dates);

  // console.log("DATE VALUES", bookingDates);
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
