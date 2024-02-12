import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import prisma from "@/prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const products = await prisma.products.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        Image: true,
        categories: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { category } = await req.json();
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const products = await prisma.products.findUnique({
      where: {
        id: params.productId,
        CategoriesId: category,
      },
      include: {
        Image: true,
        categories: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}