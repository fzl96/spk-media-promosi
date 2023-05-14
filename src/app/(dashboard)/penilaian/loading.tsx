import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

export default function PenilaianLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Penilaian" />
      <div>Loading...</div>
    </DashboardShell>
  );
}
