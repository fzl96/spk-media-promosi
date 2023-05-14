"use client";

import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Alternative } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

interface CreateNormalizedColumnsProps {
  data: Alternative[] | undefined;
}

export function CreateNormalizedColumns({
  data,
}: CreateNormalizedColumnsProps) {
  const dynamicColumns = useMemo(() => {
    return (
      data?.[0]?.evaluation
        .map((item) => item)
        .sort((a, b) => {
          const numA = parseInt(a.criteriaCode.slice(1));
          const numB = parseInt(b.criteriaCode.slice(1));

          return numA - numB;
        }) ?? []
    );
  }, [data]);
  const columns: ColumnDef<Alternative>[] = [
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
    ...dynamicColumns.map((column) => {
      return {
        accessorKey: `evaluation.${column.criteriaId}.nilai`,
        header: `${column.criteriaName} (${column.criteriaCode})`,
        cell: ({ row }: any) => {
          const evaluation = row.original.evaluation.find(
            (e: any) => e.criteriaId === column.criteriaId
          );
          return <span>{evaluation.nilai}</span>;
        },
      };
    }),
  ];

  return columns;
}
