import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

interface EditorPageProps {
  params: {
    id: string;
  };
}

export default function EditorPage({ params }: EditorPageProps) {
  return (
    <DashboardShell>
      <DashboardHeader heading={`Kriteria ${params.id}`} />
    </DashboardShell>
  );
}
