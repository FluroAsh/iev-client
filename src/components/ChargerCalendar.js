import React, { useState } from "react"
import { Calendar } from "react-multi-date-picker"

export function ChargerCalendar() {
  const [value, setValue] = useState(new Date())

  return (
    <Calendar 
      value={value}
      onChange={setValue}
    />
  )
}