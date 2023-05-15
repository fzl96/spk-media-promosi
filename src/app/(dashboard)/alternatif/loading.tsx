import { DashboardHeader } from "@/components/header";
import { TableSkeleton } from "@/components/table-skeleton";

export default function AlternatifLoading() {
  return (
    <div className="flex flex-col gap-5 overlfow-x-hidden max-w-full">
      <DashboardHeader heading="Alternatif" />
      <TableSkeleton />
    </div>
  );
}
