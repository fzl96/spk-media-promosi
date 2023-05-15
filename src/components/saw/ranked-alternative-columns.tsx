"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RankedAlternative } from "@/types";

export const columns: ColumnDef<RankedAlternative>[] = [
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "value",
    header: "Nilai",
  },
  {
    accessorKey: "rank",
    header: "Rank",
  },
];
