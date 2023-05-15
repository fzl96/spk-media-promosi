import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { TableSkeleton } from "@/components/table-skeleton";

export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-5 overlfow-x-hidden max-w-full">
      <DashboardHeader heading="Dashboard" />
      <TableSkeleton />
    </div>
  );
}
