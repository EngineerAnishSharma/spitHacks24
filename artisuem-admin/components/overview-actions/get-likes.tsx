import prisma from "@/prisma/client";

export default async function getLikes(storeId: string) {
  if (!storeId) return null;
  const products = await prisma.products.findMany({
    where: {
      StoreId: storeId,
    },
  })

  let total = []

  for(const product of products){
  const likes = await prisma.like.findMany({
    where: {
      productId:product.id,
    },
  });
  total.push(likes);
  }
  return total.length;
}
