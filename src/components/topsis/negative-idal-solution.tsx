"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IdealValue } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { IdealValueId } from "@/types";
import { IdealValueTable } from "@/components/topsis/ideal-value-table";

interface NormalizedProps {
  data: IdealValueId[] | undefined;
}

export function NegativeIdealSolution({ data }: NormalizedProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Solusi Ideal Negatif (A-)</CardTitle>
      </CardHeader>
      <CardContent>
        {data && (
          <div className="">
            <IdealValueTable data={data} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
