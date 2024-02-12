import prisma from "@/prisma/client";

export default async function getSales(StoreId: string) {
  if (!StoreId) return null;

  // const res = await prisma.order.findMany({
  //   where: {
  //     isPaid: true,
  //     StoreId,
  //   },
  //   select: {
  //     Email: true,
  //     id: true,
  //     name: true,
  //   },
  // });
  const products = await prisma.products.findMany({
    where: {
      StoreId: StoreId,
    },
  })
  const reviewsArr = []
  for(const product of products){
    const reviews = await prisma.reviews.findMany({
      where: {
        productId:product.id,
      },
    })
    for(const review of reviews){
      reviewsArr.push(review.comment);
    }
  }
  try {
    
  console.log(reviewsArr);
  const URL = process.env.NEXT_PUBLIC_FLASK_URL
  const res = await fetch(`${URL}/analyze`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({reviews:reviewsArr}),
  })
  const resdata = await res.json();
  console.log(resdata);
  const  data = [
    {
      name: "Positive Reviews",
      y: resdata.positive_percentage,
      color: "#33A669"
    },
    {
      name: "Negative Reviews",
      y: resdata.negative_percentage,
      color: "#A63446"
    }
  ]
  return data;
  
} catch (error) {
    console.log("[PRODUCT_GET]", error);
    return null
}
}
