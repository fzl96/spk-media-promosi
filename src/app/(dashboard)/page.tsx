import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { ToastSimple } from "@/components/test-toast";
import { getTopsis } from "@/lib/topsis";
import { Alternative, PreferenceValuesType } from "@/types";
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
  const results = getTopsis(data);

  return (
    <div className="flex flex-col gap-5 overlfow-x-hidden max-w-full">
      <Card>
        <CardHeader>
          <CardTitle>Metode TOPSIS</CardTitle>
          <CardDescription>
            Hasil perhitungan menggunakan metode TOPSIS
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <DataTable
              columns={columns}
              data={results?.preferenceValues as PreferenceValuesType[]}
              selectable={false}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
