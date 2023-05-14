"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { CreateDistanceColumns } from "@/components/topsis/distance-columns";

interface DistanceData {
  id: string;
  value: number;
}

interface DistanceProps {
  positiveDistanceData: DistanceData[] | undefined;
  negativeDistanceData: DistanceData[] | undefined;
}

export function Distance({
  positiveDistanceData,
  negativeDistanceData,
}: DistanceProps) {
  const positiveColumns = CreateDistanceColumns("D+");
  const negativeColumns = CreateDistanceColumns("D-");

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Jarak Antara Nilai Terbobot</CardTitle>
      </CardHeader>
      <CardContent>
        {positiveDistanceData && negativeDistanceData && (
          <div className="flex flex-col md:flex-row w-full gap-2">
            <div className="w-full">
              <DataTable
                columns={positiveColumns}
                data={positiveDistanceData}
                selectable={false}
              />
            </div>
            <div className="w-full">
              <DataTable
                columns={negativeColumns}
                data={negativeDistanceData}
                selectable={false}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
