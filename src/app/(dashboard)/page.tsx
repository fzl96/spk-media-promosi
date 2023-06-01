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
import { Dashboard } from "@/components/dashboard";

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

  return <Dashboard results={results} resultsSAW={resultsSAW} />;
}
