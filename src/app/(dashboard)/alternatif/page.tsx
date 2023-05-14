import { AlternativeCreateButton } from "@/components/alternative-create-button";
import AlternativeTable from "@/components/alternative-table";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Criteria } from "@prisma/client";
import { Suspense } from "react";

interface Alternative {
  id: string;
  name: string;
  evaluation: {
    criteriaId: string;
    criteriaName: string;
    criteriaWeight: number;
    criteriaCode: string;
    nilai: number;
  }[];
}

async function getCriteria() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/criteria`, {
    cache: "no-store",
  });
  const data: Criteria[] = await res.json();
  return data;
}

async function getAlternative() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alternative`, {
    cache: "no-store",
  });
  const data: Alternative[] = await res.json();
  return data;
}

export const metadata = {
  title: "Alternatif",
  description: "Generated with create next app",
};

export default async function AlternatifPage() {
  const criteriaData = getCriteria();
  const alternativeData = getAlternative();

  const [criteria, alternative] = await Promise.all([
    criteriaData,
    alternativeData,
  ]);

  console.log(alternative);

  return (
    <DashboardShell>
      <DashboardHeader heading="Alternatif">
        <Suspense fallback={<h1>Loading...</h1>}>
          <AlternativeCreateButton criteria={criteria} />
        </Suspense>
      </DashboardHeader>
      <div className="px-5">
        <AlternativeTable
          criteria={criteria}
          data={alternative}
          deleteEndpoint="/api/alternative"
        />
      </div>
    </DashboardShell>
  );
}
