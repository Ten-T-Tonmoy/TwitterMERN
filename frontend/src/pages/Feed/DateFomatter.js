export const formatDate = (createdAt) => {
  const presentDate = new Date();
  const postCreatedAtDate = new Date(createdAt);

  const timeDiffSeconds = Math.floor((presentDate - postCreatedAtDate) / 1000);
  const timeDiffMinutes = Math.floor(timeDiffSeconds / 60);
  const timeDiffHours = Math.floor(timeDiffMinutes / 60);
  const timeDiffDays = Math.floor(timeDiffHours / 24);

  if (timeDiffDays > 1) {
    return postCreatedAtDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } else if (timeDiffDays === 1) {
    return "1d";
  } else if (timeDiffHours >= 1) {
    return `${timeDiffHours}h`;
  } else if (timeDiffMinutes >= 1) {
    return `${timeDiffMinutes}m`;
  } else {
    return "Just now";
  }
};
