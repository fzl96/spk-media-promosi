"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alternative } from "@/types";
import { CreateNormalizedColumns } from "@/components/topsis/normalized-columns";
import { useMemo } from "react";
import { DataTable } from "../ui/data-table";

interface NormalizedProps {
  data: Alternative[] | undefined;
}

export function Normalized({ data }: NormalizedProps) {
  const columns = CreateNormalizedColumns({ data });
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Matrix Ternormalisasi (R)</CardTitle>
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
