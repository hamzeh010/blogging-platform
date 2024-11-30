export const timeAgo = (dateString: string): string => {
  const now = new Date();
  const createdAt = new Date(dateString);
  const seconds = Math.floor((now.getTime() - createdAt.getTime()) / 1000);

  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  if (seconds < 5) return "Just now";
  for (const [unit, value] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / value);
    if (interval >= 1) {
      return `${interval} ${unit}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
};


// Helper function to extract the first two letters of a string
export const getInitials = (name: string) => {
  if (!name) return '??'; // Fallback for empty or undefined names
  return name.substring(0, 2).toUpperCase();
};
