"use client";

import { Criteria } from "@prisma/client";
import { CreateAlternativeColumns } from "@/components/alternative-table-columns";
import { DataTable } from "./ui/data-table";
import { useMemo } from "react";

interface Alternative {
  id: string;
  name: string;
  evaluation: {
    criteriaId: string;
    criteriaName: string;
    criteriaWeight: number;
    criteriaCode: string;
    nilai: number;
  }[];
}

interface AlternativeTableProps {
  criteria: Criteria[];
  data: Alternative[];
  deleteEndpoint: string;
}

export default function AlternativeTable({
  data,
  deleteEndpoint,
  criteria,
}: AlternativeTableProps) {
  const dynamicColumns = useMemo(() => {
    return data[0]?.evaluation
      .map((item) => item)
      .sort((a, b) => {
        const numA = parseInt(a.criteriaCode.slice(1));
        const numB = parseInt(b.criteriaCode.slice(1));

        return numA - numB;
      });
  }, [data]);

  const columns = CreateAlternativeColumns({ dynamicColumns, criteria });
  return (
    <DataTable columns={columns} data={data} deleteEndpoint={deleteEndpoint} />
  );
}
