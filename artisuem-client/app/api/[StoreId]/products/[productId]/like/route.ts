import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import prisma from "@/prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { userId } = await req.json()
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const products = await prisma.like.findMany({
      where: {
        userId: userId,
        productId: params.productId,
      }
    });

    if(products.length > 0){
      await prisma.like.deleteMany({
        where: {
          userId: userId,
          productId: params.productId,
        }
      })
      return new NextResponse("Product unliked", { status: 200 });
    }
    const pdt = await prisma.products.findUnique({
      where: {
        id: params.productId
      },
      select: {
        CategoriesId: true
    }})
    if(pdt !== null){
    const category = await prisma.categories.findUnique({
      where: {
        id: pdt.CategoriesId
    }
  })
    const like = await prisma.like.create({
      data: {
        userId: userId,
        productId: params.productId,
        category: category?category.name:"Handicrafts"
      }
    })
    return NextResponse.json(like);
  } return new NextResponse("Product not found", { status: 404 });
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

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    
    const review = await prisma.like.findMany({
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