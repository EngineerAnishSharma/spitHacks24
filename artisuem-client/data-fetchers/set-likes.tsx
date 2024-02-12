import { Like } from "@prisma/client/edge";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const sendLike= async ({id, userId}: {id:string, userId: string}): Promise<Like> => {
  console.log("URL: ", URL);
  const res = await fetch(`${URL}/${id}/like`,{
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

export default sendLike;
