import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { useGlobalState } from "../context/stateContext";

export function ChargerCalendar() {
  const { store, dispatch } = useGlobalState();
  const { bookingDates } = store;
  const [dates, setDates] = useState(bookingDates);

  const handleCalendar = (date) => {
    // console.log(new Date(date));
    // const newDate = new Date(date);
    setDates(date);
    console.log("dates", dates);

    // dispatch({
    //   type: "setBookingDates",
    //   data: dates,
    // });
  };

  // console.log("DATE VALUES", bookingDates);
  return <Calendar multiple value={dates} onChange={handleCalendar} />;
}
