import { DashboardHeader } from "@/components/header";
import { getTopsis } from "@/lib/topsis";
import { getSAW } from "@/lib/saw";
import { Normalized } from "@/components/topsis/normalized";
import { Weighted } from "@/components/topsis/weighted";
import { PositiveIdealSolution } from "@/components/topsis/positive-ideal-solution";
import { NegativeIdealSolution } from "@/components/topsis/negative-idal-solution";
import { Distance } from "@/components/topsis/distance";
import { PreferenceValues } from "@/components/topsis/preference-values";
import { Alternative } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NormalizedSAW } from "@/components/saw/normalized-saw";
import { PreferenceMatrix } from "@/components/saw/preference-matrix";
import { RankedAlternative } from "@/components/saw/ranked-alternative";

export const metadata = {
  title: "Penilaian",
  description: "Generated with create next app",
};

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
  const resultsSAW = getSAW(data);

  return (
    <div className="flex flex-col gap-5 overlfow-x-hidden max-w-full">
      <DashboardHeader heading="Penilaian" />
      <Tabs defaultValue="topsis">
        <TabsList>
          <TabsTrigger value="topsis">TOPSIS</TabsTrigger>
          <TabsTrigger value="saw">SAW</TabsTrigger>
        </TabsList>
        <TabsContent value="topsis">
          <div className="flex flex-col gap-5">
            <Normalized data={results?.normalizedData} />
            <Weighted data={results?.weightedMatrix} />
            <PositiveIdealSolution data={results?.positiveIdealSolution} />
            <NegativeIdealSolution data={results?.negativeIdealSolution} />
            <Distance
              positiveDistanceData={results?.positiveDistancesSolution}
              negativeDistanceData={results?.negativeDistancesSolution}
            />
            <PreferenceValues data={results?.preferenceValues} />
            <pre>
              <code>{JSON.stringify(results?.preferenceValues, null, 2)}</code>
            </pre>
          </div>
        </TabsContent>
        <TabsContent value="saw">
          <div className="flex flex-col gap-5">
            <NormalizedSAW data={resultsSAW?.normalizedMatrix} />
            <PreferenceMatrix data={resultsSAW?.preferenceMatrix} />
            <RankedAlternative data={resultsSAW?.rankedAlternative} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
