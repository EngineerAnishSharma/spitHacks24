"use client";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";
import React from "react";
import { useParams, useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { DataTable } from "../../../../../../components/ui/data-table";
import { CaptionsColumn, columns } from "./column";
import ApiList from "../../../../../../components/ui/api-list";

type CaptionsProps = {
  CaptionsData: CaptionsColumn[];
};

const Captions = ({ CaptionsData }: CaptionsProps) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <Heading
            title={`Captions(${CaptionsData.length})`}
            description="Create and manage Captions"
          />
        </div>
        <Button
          onClick={() => {
            router.push(`/${params.StoreId}/Captions/new`);
          }}
          className="gap-x-2 hover:bg-secondary hover:text-primary"
        >
          <Plus className="h-5 w-4" />
          New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={CaptionsData} />
    </>
  );
};

export default Captions;