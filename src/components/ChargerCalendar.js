import React, { useState } from "react";
import { Calendar } from "react-multi-date-picker";
import { useGlobalState } from "../context/stateContext";


export function ChargerCalendar() {

    const { store, dispatch } = useGlobalState();
  const { bookingDates } = store;



  const handleCalendar = (dates) => {
    dispatch({
        type: "setBookingDates",
        data: dates
    })
  }

  console.log("DATE VALUES",bookingDates)
  return <Calendar 
    multiple 
    value={bookingDates} 
    onChange={handleCalendar} 
    />;
}
