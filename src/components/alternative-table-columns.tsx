"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { CriteriaOperation } from "@/components/criteria-operation";
import { AlternativeOperation } from "./alternative-operation";
import { Criteria } from "@prisma/client";

type Evaluation = {
  criteriaId: string;
  criteriaName: string;
  criteriaCode: string;
  criteriaWeight: number;
  nilai: number;
};

export type Alternative = {
  id: string;
  name: string;
  evaluation: Evaluation[];
};

interface CreateAlternativeProps {
  dynamicColumns: Evaluation[];
  criteria: Criteria[];
}

export function CreateAlternativeColumns({
  dynamicColumns,
  criteria,
}: CreateAlternativeProps) {
  const columns: ColumnDef<Alternative>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
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
    ...dynamicColumns.map((column) => {
      return {
        accessorKey: `evaluation.${column.criteriaCode}.nilai`,
        header: column.criteriaName,
        cell: ({ row }: any) => {
          const evaluation = row.original.evaluation.find(
            (e: any) => e.criteriaId === column.criteriaId
          );
          return <span>{evaluation.nilai}</span>;
        },
      };
    }),
    {
      id: "action",
      cell: ({ row }) => (
        <AlternativeOperation alternative={row.original} criteria={criteria} />
      ),
    },
  ];

  return columns;
}
