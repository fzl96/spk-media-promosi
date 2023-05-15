"use client";

import { ArrowDown, ArrowUp, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { PreferenceMatrixSAW } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { roundNumber } from "@/lib/topsis";

interface CreatePreferenceMatrixColumnsProps {
  data: PreferenceMatrixSAW[] | undefined;
}

export function CreatePreferenceMatrixColumns({
  data,
}: CreatePreferenceMatrixColumnsProps) {
  const dynamicColumns = useMemo(() => {
    return (
      data?.[0]?.preferenceValues
        .map((item) => item)
        .sort((a, b) => {
          const numA = parseInt(a.criteriaCode.slice(1));
          const numB = parseInt(b.criteriaCode.slice(1));

          return numA - numB;
        }) ?? []
    );
  }, [data]);
  const columns: ColumnDef<PreferenceMatrixSAW>[] = [
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
        accessorKey: `preferenceValues.${column.criteriaId}.preferenceValue`,
        header: `${column.criteriaName} (${column.criteriaCode})`,
        cell: ({ row }: any) => {
          const evaluation = row.original.preferenceValues.find(
            (e: any) => e.criteriaId === column.criteriaId
          );
          return <span>{roundNumber(evaluation.preferenceValue)}</span>;
        },
      };
    }),
  ];

  return columns;
}
