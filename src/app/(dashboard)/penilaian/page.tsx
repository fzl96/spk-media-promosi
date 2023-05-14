import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { getTopsis } from "@/lib/topsis";
import { Normalized } from "@/components/topsis/normalized";
import { Weighted } from "@/components/topsis/weighted";
import { PositiveIdealSolution } from "@/components/topsis/positive-ideal-solution";

export const metadata = {
  title: "Penilaian",
  description: "Generated with create next app",
};

interface Evaluation {
  criteriaId: string;
  criteriaName: string;
  criteriaWeight: number;
  criteriaType: string;
  criteriaCode: string;
  nilai: number;
}

interface Alternative {
  id: string;
  name: string;
  evaluation: Evaluation[];
}

async function getAlternative() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alternative`, {
    cache: "no-store",
  });
  const data: Alternative[] = await res.json();
  return data;
}

export default async function PenilaianPage() {
  const data: Alternative[] = await getAlternative();

  const results = getTopsis(data);

  return (
    <div className="flex flex-col gap-5 overlfow-x-hidden max-w-full">
      <DashboardHeader heading="Penilaian" />
      <Normalized data={results?.normalizedData} />
      <Weighted data={results?.weightedMatrix} />
      <PositiveIdealSolution data={results?.positiveIdealSolution} />
    </div>
  );
}
