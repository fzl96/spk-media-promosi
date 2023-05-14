import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { ToastSimple } from "@/components/test-toast";

export const metadata = {
  title: "Dashboard",
  description: "Generated with create next app",
};

export default function Home() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" />
      <div className="divide-border-200 divide-y rounded-md border">
        <ToastSimple />
      </div>
    </DashboardShell>
  );
}
