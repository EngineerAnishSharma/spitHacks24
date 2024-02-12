import prisma from "@/prisma/client";

export default async function getClicks(storeId: string) {
  if (!storeId) return null;
  const products = await prisma.products.findMany({
    where: {
      StoreId: storeId,
    },
  })

  let ctr = 0;
  for(const product of products){
    
  const clicks = await prisma.click.findMany({
    where: {
      productId:product.id,
    },
  });
  for(const click of clicks){
    ctr += click.number;
  }
}

  return ctr;
}
