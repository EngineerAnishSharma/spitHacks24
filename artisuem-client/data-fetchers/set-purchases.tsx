import { Click, Like, Purchase } from "@prisma/client/edge";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const sendPurchase= async ({id, userId}: {id:string, userId: string}): Promise<Purchase> => {
  console.log("URL: ", URL);
  const res = await fetch(`${URL}/${id}/purchase`,{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({userId})
  });
  if (res.status !== 200) {
    console.log(await res.json())
    throw new Error("Error fetching likes");}
  const data = await res.json();
  return data;
};

export default sendPurchase;
