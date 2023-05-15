"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PreferenceMatrixSAW } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { CreatePreferenceMatrixColumns } from "@/components/saw/preference-matrix-columns";

interface PreferenceMatrixProps {
  data: PreferenceMatrixSAW[] | undefined;
}

export function PreferenceMatrix({ data }: PreferenceMatrixProps) {
  const columns = CreatePreferenceMatrixColumns({ data });
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Nilai Preferensi</CardTitle>
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
