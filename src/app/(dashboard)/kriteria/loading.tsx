import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

export default function KriteriaLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Kriteria" />
      <div>Loading...</div>
    </DashboardShell>
  );
}
