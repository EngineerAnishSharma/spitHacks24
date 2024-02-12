import React from "react";

import prisma from "@/prisma/client";
import Captions from "./components/Captions";

const CaptionsPage = async ({ params }: { params: { StoreId: string } }) => {
  const FindCaptions = await prisma.captions.findMany({
    where: {
      StoreId: params.StoreId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  
  const FilteredData = FindCaptions.map((captions)=>(
    {
        id:captions.id,
        title:captions.title,
        content:captions.content,
        createdAt:captions.createdAt.toDateString()
    }
  ))
  return (
    <div className="flex flex-col">
      <div className="flex-1 py-6 px-8">
        <Captions CaptionsData={FilteredData}  />
      </div>
    </div>
  );
};

export default CaptionsPage;