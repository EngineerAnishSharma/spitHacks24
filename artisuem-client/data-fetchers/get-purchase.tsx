import { Like, Purchase } from "@prisma/client/edge";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getLikes = async (id: string): Promise<Purchase[]> => {
  console.log("URL: ", URL);
  const res = await fetch(`${URL}/${id}/purchase`);
  if (res.status !== 200) {
    console.log(await res.json())
    throw new Error("Error fetching categories");}
  const data = await res.json();
  return data;
};

export default getLikes;
