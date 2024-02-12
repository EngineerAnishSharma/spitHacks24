import prisma from "@/prisma/client";

export default async function (storeId: string) {
  if (!storeId) return null;
  const products = await prisma.products.findMany({
    where: {
      StoreId: storeId,
    },
  })

  let total = [];
  for(const product of products){
  const purchases = await prisma.purchase.findMany({
    where: {
      productId:product.id,
    },
  });
  total.push(purchases);
}

  return total.length;
}
