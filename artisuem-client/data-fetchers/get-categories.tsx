const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  console.log("URL: ", URL);
  const res = await fetch(URL);
  if (res.status !== 200) {
    console.log(await res.json())
    throw new Error("Error fetching categories");}
  const data = await res.json();
  return data;
};

export default getCategories;
