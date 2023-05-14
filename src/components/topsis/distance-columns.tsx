"use client";

import { ColumnDef } from "@tanstack/react-table";

interface DistanceData {
  id: string;
  value: number;
}

export function CreateDistanceColumns(
  headerName: string
): ColumnDef<DistanceData>[] {
  return [
    {
      accessorKey: "id",
      header: headerName,
    },
    {
      accessorKey: "value",
      header: "Value",
    },
  ];
}
