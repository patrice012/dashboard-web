export function formatDate(timestamp: string): string {
  const date = new Date(timestamp);

  // Convert to desired format: November 23, 2023
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formattedDate;
}

