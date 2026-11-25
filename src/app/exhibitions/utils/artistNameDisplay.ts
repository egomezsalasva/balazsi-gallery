export const artistNameDisplay = (artists: { name: string }[]) => {
  if (artists.length === 0) {
    return "TBA";
  }
  if (artists.length === 1) {
    return artists[0].name;
  }
  if (artists.length === 2) {
    return "Duo Exhibition";
  }
  return "Group Show";
};
