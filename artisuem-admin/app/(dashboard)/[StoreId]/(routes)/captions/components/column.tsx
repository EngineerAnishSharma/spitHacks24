"use client";
import { ColumnDef } from "@tanstack/react-table";
import CellActions from "./Cell-Actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CaptionsColumn = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export const columns: ColumnDef<CaptionsColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "captions",
    header: "Captions",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
