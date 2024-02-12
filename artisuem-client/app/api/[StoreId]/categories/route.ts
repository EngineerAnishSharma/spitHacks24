import { NextResponse } from "next/server";
// import { auth } from "@clerk/nextjs";

import prisma from "@/prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { StoreId: string } }
) {
  try {
    console.log("here!!!!!!!!!!!!")
    if (!params.StoreId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const categories = await prisma.categories.findMany({
      where: {
        StoreId: params.StoreId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
