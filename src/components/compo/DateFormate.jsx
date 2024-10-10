// FormattedDate.js
import React from "react";

const formatDate = (isoString) => {
  const date = new Date(isoString);

  // Using toLocaleString for formatting
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Set to false for 24-hour format
  });
};

const FormattedDate = ({ isoString }) => {
  const formattedDate = formatDate(isoString);

  return <span>{formattedDate}</span>;
};

export default FormattedDate;
