const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (id: string) => {
  if (!id) throw new Error("Id is required");
  // const res = await fetch(`${URL}/${id}`);
  // if (res.status !== 200) throw new Error("Error fetching billboard");
  const data = {
    id:"ck23",
    label:"",
    ImageUrl:"https://res.cloudinary.com/db670bhmc/image/upload/v1707559084/qxobq1uy1xiiztum1msz.png"
}

  return data;
};

export default getBillboard;
