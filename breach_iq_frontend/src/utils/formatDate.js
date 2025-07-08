// 2025-07-07T09:53:14.638Z
export const formatDate = (isoString) => {
  const date = new Date(isoString);

  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getUTCFullYear();

  // Function to get ordinal suffix
  function getOrdinalSuffix(n) {
    if (n > 3 && n < 21) return "th"; // 4th-20th
    switch (n % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  return formattedDate;
};

export const formatDateAndTime = (isoString) => {
  const date = new Date(isoString);

  // Format the day and month
  const optionsDate = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", optionsDate);

  // Add the day suffix (e.g., 7th, 22nd)
  const day = date.getDate();
  let daySuffix;
  if (day > 3 && day < 21) {
    // Covers 4th-20th
    daySuffix = "th";
  } else {
    switch (day % 10) {
      case 1:
        daySuffix = "st";
        break;
      case 2:
        daySuffix = "nd";
        break;
      case 3:
        daySuffix = "rd";
        break;
      default:
        daySuffix = "th";
    }
  }

  // Replace the default day with the day + suffix
  const finalFormattedDate = formattedDate.replace(
    new RegExp(`\\b${day}\\b`),
    `${day}${daySuffix}`
  );

  // Format the time in 12-hour clock
  const optionsTime = {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour format
  };
  const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

  return `${finalFormattedDate} | ${formattedTime}`;
};
