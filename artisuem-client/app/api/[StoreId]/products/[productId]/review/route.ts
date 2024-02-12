import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import prisma from "@/prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId, comment } = await req.json()
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const review = await prisma.reviews.create({
      data: {
        userId: userId,
        productId: params.productId,
        comment: comment
      }
    })
    return NextResponse.json(review);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const review = await prisma.reviews.findMany({
      where: {
        productId: params.productId
      }
    })
    return NextResponse.json(review);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
