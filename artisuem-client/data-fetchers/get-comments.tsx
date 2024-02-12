const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getCategories = async (id: string): Promise<Category[]> => {
  console.log("URL: ", URL);
  const res = await fetch(`${URL}/${id}/review`);
  if (res.status !== 200) {
    console.log(await res.json())
    throw new Error("Error fetching categories");}
  const data = await res.json();
  return data;
};

export default getCategories;
