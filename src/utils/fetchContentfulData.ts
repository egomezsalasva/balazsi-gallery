export const fetchContentfulData = async (
  query: string,
  variables?: Record<string, unknown>,
) => {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    },
  );

  const data = await res.json();
  return data;
};
