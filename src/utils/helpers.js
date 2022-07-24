export const displayAUD = (cents) => {
  return (cents / 100).toLocaleString("en-US", {style:"currency", currency:"AUD"});
}