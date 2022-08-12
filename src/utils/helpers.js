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

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function returnInitials(firstName, lastName) {
  return (firstName[0] + lastName[0]).toUpperCase();
}

// impromptu randomly generated UUID function
export function createUUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
