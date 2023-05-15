"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RankedAlternative } from "@/types";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/saw/ranked-alternative-columns";

interface PreferenceMatrixProps {
  data: RankedAlternative[] | undefined;
}

export function RankedAlternative({ data }: PreferenceMatrixProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Hasil</CardTitle>
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
