import { Click, Like } from "@prisma/client/edge";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getClicks = async (id: string): Promise<Click[]> => {
  console.log("URL: ", URL);
  const res = await fetch(`${URL}/${id}/click`);
  if (res.status !== 200) {
    console.log(await res.json())
    throw new Error("Error fetching categories");}
  const data = await res.json();
  return data;
};

export default getClicks;
