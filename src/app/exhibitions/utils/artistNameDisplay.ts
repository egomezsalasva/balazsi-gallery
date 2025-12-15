export const artistNameDisplay = (artists: { name: string }[]) => {
  if (artists.length === 1) {
    return artists[0].name;
  } else if (artists.length === 2) {
    return "Duo Exhibition";
  } else {
    return "Group Show";
  }
};
