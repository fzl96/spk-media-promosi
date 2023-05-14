import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Criteria } from "@prisma/client";
import { CreateButton } from "@/components/create-button";
import { DataTable } from "@/components/ui/data-table";
import { Criteria as CriteriaType, columns } from "./columns";

export const metadata = {
  title: "Kriteria",
  description: "Generated with create next app",
};

export default async function CriteriaPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/criteria`, {
    cache: "no-store",
  });
  const data: Criteria[] = await res.json();
  return (
    <div className="flex flex-col gap-5 overlfow-x-hidden">
      <DashboardHeader heading="Kriteria">
        <CreateButton />
      </DashboardHeader>
      {/* <div className="px-5 max-w-full overflow-x-auto"> */}
      <DataTable columns={columns} data={data} deleteEndpoint="/api/criteria" />
      {/* </div> */}
    </div>
  );
}
