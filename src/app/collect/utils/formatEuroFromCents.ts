export const formatEuroFromCents = (cents: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
  }).format(cents / 100);
};
