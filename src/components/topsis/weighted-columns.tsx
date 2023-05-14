"use client";

import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { WeightedMatrix } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

interface CreateWeightedColumns {
  data: WeightedMatrix[] | undefined;
}

export function CreateWeightedColumns({ data }: CreateWeightedColumns) {
  const dynamicColumns = useMemo(() => {
    return (
      data?.[0]?.weightedMatrix
        .map((item) => item)
        .sort((a, b) => {
          const numA = parseInt(a.criteriaCode.slice(1));
          const numB = parseInt(b.criteriaCode.slice(1));

          return numA - numB;
        }) ?? []
    );
  }, [data]);
  const columns: ColumnDef<WeightedMatrix>[] = [
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
        accessorKey: `weightedMatrix.${column.criteriaCode}.weightedValue`,
        header: `${column.criteriaName} (${column.criteriaCode})`,
        cell: ({ row }: any) => {
          const weighted = row.original.weightedMatrix.find(
            (e: any) => e.criteriaId === column.criteriaId
          );
          return <span>{weighted.weightedValue}</span>;
        },
      };
    }),
  ];

  return columns;
}
