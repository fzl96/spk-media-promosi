"use client";

import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { IdealValueId } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

interface CreatePositiveIdealColumnsProps {
  data: IdealValueId[] | undefined;
}

export function CreatePositiveIdealColumns({
  data,
}: CreatePositiveIdealColumnsProps) {
  const dynamicColumns = useMemo(() => {
    return (
      data
        ?.map((item) => item)
        .sort((a, b) => {
          const numA = parseInt(a.id.slice(1));
          const numB = parseInt(b.id.slice(1));

          return numA - numB;
        }) ?? []
    );
  }, [data]);

  const columns: ColumnDef<IdealValueId>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kode
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <MoreHorizontal className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nama
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <MoreHorizontal className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "idealValue",
      header: ({ column }) => {
        const isSorted = column.getIsSorted();
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nilai Ideal Positif (A+)
            {isSorted === "asc" ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : isSorted === "desc" ? (
              <ArrowDown className="ml-2 h-4 w-4" />
            ) : (
              <MoreHorizontal className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    // ...dynamicColumns.map((column) => {
    //   console.log("column: ", column);
    //   return {
    //     accessorKey: `${column.id}.idealValue`,
    //     header: `${column.name} (${column.id})`,
    //     cell: ({ row }: any) => {
    //       console.log("row", row.original);
    //     },
    //   };
    // }),
  ];

  return columns;
}
