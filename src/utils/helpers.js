export function displayAUD(cents) {
  return (cents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "AUD",
  });
}

/** Converts to users local date/time from ISO8601 UTC string */
export function displayLocalTime(dateTime) {
  const date = new Date(dateTime).toLocaleDateString();
  // Time not needed yet, currently full day bookings (MVP)
  // const time = new Date(dateTime).toLocaleTimeString();
  return date;
}

export function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1);
}

export function returnInitials(firstName, lastName) {
  return firstName[0] + lastName[0];
}
