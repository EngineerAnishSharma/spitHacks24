const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const sendComment = async (id: string,comment:string, userId: string): Promise<Category[]> => {
  console.log("URL: ", URL);
  const res = await fetch(`${URL}/${id}/review`,{
    method:"POST",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify({userId, comment, productId: id})
  });
  if (res.status !== 200) {
    console.log(await res.json())
    throw new Error("Error fetching categories");}
  const data = await res.json();
  return data;
};

export default sendComment;
