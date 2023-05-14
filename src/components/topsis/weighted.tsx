"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeightedMatrix } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { CreateWeightedColumns } from "@/components/topsis/weighted-columns";

interface NormalizedProps {
  data: WeightedMatrix[] | undefined;
}

export function Weighted({ data }: NormalizedProps) {
  const columns = CreateWeightedColumns({ data });
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Matrix Ternormalisasi Terbobot Y</CardTitle>
      </CardHeader>
      <CardContent>
        {data && (
          <div>
            <DataTable columns={columns} data={data} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
