function sortBreaches(arr) {
  return arr?.sort((a, b) => {
    // First, compare by breach_date descending
    if (a.breach_date !== b.breach_date) {
      return b.breach_date.localeCompare(a.breach_date);
    }

    // If breach_date is the same, compare by breach_name descending
    return b.breach_name.localeCompare(a.breach_name);
  });
}

export default sortBreaches;
