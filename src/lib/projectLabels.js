export const GENRE_LABELS = {
  Clients: "Shipped",
  "Open Source": "Open Source",
  Contributions: "Contributions",
  Projects: "Projects",
};

export const getGenreLabel = (genre) => GENRE_LABELS[genre] || genre;
