import prisma from "@/prisma/client";

type GraphData = {
  name: string;
  total: number;
};

export default async function getGraphData(StoreId: string) {
 
  if (!StoreId) return null;

  const paidOrders = await prisma.order.findMany({
    where: {
      StoreId,
      isPaid: true,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });
  const monthlyRevenue: { [key: number]: number } = {};
  for (const order of paidOrders) {
    const month = order.createdAt.getMonth();
    let revenueFororder = 0;
    for (const item of order.orderItems) {
      revenueFororder += item.product.price.toNumber();
    }
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + revenueFororder;
  }
  const data: GraphData[] = [
    {
      name: "Jan",
      total: 500,
    },
    {
      name: "Feb",
      total: 800,
    },
    {
      name: "Mar",
      total: 1200,
    },
    {
      name: "Apr",
      total: 1000,
    },
    {
      name: "May",
      total: 3200,
    },
    {
      name: "Jun",
      total: 4500,
    },
    {
      name: "Jul",
      total: 3700,
    },
    {
      name: "Aug",
      total: 4000,
    },
    {
      name: "Sep",
      total: 5200,
    },
    {
      name: "Oct",
      total: 4000,
    },
    {
      name: "Nov",
      total: 2000,
    },
    {
      name: "Dec",
      total: 1700,
    },
  ];
  // for (const month in monthlyRevenue) {
  //   data[parseInt(month)].total = monthlyRevenue[parseInt(month)];
  // }

  return data
}
