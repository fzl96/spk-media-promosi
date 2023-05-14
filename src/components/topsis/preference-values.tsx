"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { CreateDistanceColumns } from "@/components/topsis/distance-columns";
import { PreferenceValuesType } from "@/types";
import { columns } from "@/components/topsis/preference-values-columns";

interface PreferenceValuesProps {
  data: PreferenceValuesType[] | undefined;
}

export function PreferenceValues({ data }: PreferenceValuesProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Nilai Preferensi (V)</CardTitle>
      </CardHeader>
      <CardContent>
        {data && (
          <div>
            <DataTable columns={columns} data={data} selectable={false} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
