import prisma from "@/prisma/client";
// import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { StoreId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const CategoriesId = searchParams.get("CategoriesId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const sizesId = searchParams.get("sizesId") || undefined;
    const Featured = searchParams.get("Featured");
    if (!params.StoreId)
      return new NextResponse("Store id is required", { status: 400 });
    const products = await prisma.products.findMany({
      where: {
        StoreId: params.StoreId,
        CategoriesId,
        colorId,
        sizesId,
        Featured: Featured ? true : undefined,
        Archived: false,
      },
      include: {
        Image: true,
        categories: true,
        color: true,
        size: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(products);
  } catch (err) {
    console.log("PRODUCT_GET", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
