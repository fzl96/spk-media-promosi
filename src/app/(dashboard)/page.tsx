import { getTopsis } from "@/lib/topsis";
import { Alternative, PreferenceValuesType, RankedAlternative } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/topsis/preference-values-columns";
import { columns as SAWColumns } from "@/components/saw/ranked-alternative-columns";
import { getSAW } from "@/lib/saw";

export const metadata = {
  title: "Dashboard",
  description: "Generated with create next app",
};

async function getAlternative() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alternative`, {
    cache: "no-store",
  });
  const data: Alternative[] = await res.json();
  return data;
}

export default async function Home() {
  const data: Alternative[] = await getAlternative();

  if (!data) return <h1>No data...</h1>;

  const results = getTopsis(data);
  const resultsSAW = getSAW(data);

  return (
    <div className="flex flex-col md:flex-row gap-5 overlfow-x-hidden max-w-full">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Metode TOPSIS</CardTitle>
            <CardDescription>
              Hasil perhitungan menggunakan metode TOPSIS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {results && results.preferenceValues ? (
                <DataTable
                  columns={columns}
                  data={results?.preferenceValues as PreferenceValuesType[]}
                  selectable={false}
                />
              ) : (
                <h1>Tidak ada data</h1>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Metode SAW</CardTitle>
            <CardDescription>
              Hasil perhitungan menggunakan metode SAW
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              {resultsSAW && resultsSAW.rankedAlternative ? (
                <DataTable
                  columns={SAWColumns}
                  data={resultsSAW?.rankedAlternative as RankedAlternative[]}
                  selectable={false}
                />
              ) : (
                <h1>Tidak ada data</h1>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
