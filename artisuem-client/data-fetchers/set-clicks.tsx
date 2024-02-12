import { Click, Like } from "@prisma/client/edge";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const sendClicks= async ({id, userId}: {id:string, userId: string}): Promise<Click> => {
  console.log("URL: ", URL);
  const res = await fetch(`${URL}/${id}/click`,{
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

export default sendClicks;
