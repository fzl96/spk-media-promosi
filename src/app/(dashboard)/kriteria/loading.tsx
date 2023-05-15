import { DashboardHeader } from "@/components/header";
import { TableSkeleton } from "@/components/table-skeleton";

export default function KriteriaLoading() {
  return (
    <div className="flex flex-col gap-5 overlfow-x-hidden max-w-full">
      <DashboardHeader heading="Kriteria" />
      <TableSkeleton />
    </div>
  );
}
