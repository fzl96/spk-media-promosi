"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PreferenceValuesType } from "@/types";

export const columns: ColumnDef<PreferenceValuesType>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "preferenceValues",
    header: "Nilai",
  },
  {
    accessorKey: "rank",
    header: "Rank",
  },
];
