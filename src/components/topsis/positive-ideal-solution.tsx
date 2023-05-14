"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IdealValue } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { CreatePositiveIdealColumns } from "@/components/topsis/positive-ideal-columns";
import { IdealValueId } from "@/types";
import PositiveIdealTable from "@/components/topsis/positive-ideal-table";

interface NormalizedProps {
  data: IdealValueId[] | undefined;
}

export function PositiveIdealSolution({ data }: NormalizedProps) {
  const columns = CreatePositiveIdealColumns({ data });
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Solusi Ideal Positif (A+)</CardTitle>
      </CardHeader>
      <CardContent>
        {data && (
          <div className="">
            <PositiveIdealTable data={data} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
