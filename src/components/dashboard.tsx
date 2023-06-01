"use client";

import { Alternative, PreferenceValuesType, RankedAlternative } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "@/components/topsis/preference-values-columns";
import { columns as SAWColumns } from "@/components/saw/ranked-alternative-columns";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { DashboardDataTable } from "./ui/dashboard-data-table";
import ReactToPrint from "react-to-print";
import { DashboardHeader } from "./header";

export function Dashboard({
  results,
  resultsSAW,
}: {
  results: any;
  resultsSAW: any;
}) {
  const [isPrinting, setIsPrinting] = useState<boolean>(false);
  const componentRef = useRef(null);
  const promiseResolveRef = useRef<any>(null);

  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  return (
    <>
      <DashboardHeader heading="Dashboard">
        <ReactToPrint
          trigger={() => <Button>Cetak</Button>}
          content={() => componentRef.current}
          onBeforeGetContent={() => {
            return new Promise((resolve) => {
              promiseResolveRef.current = resolve;
              setIsPrinting(true);
            });
          }}
          onAfterPrint={() => setIsPrinting(false)}
        />
      </DashboardHeader>
      <div
        ref={componentRef}
        className={`flex flex-col mt-5 ${
          isPrinting ? "p-5 text-lg" : "md:flex-row "
        } gap-5 max-w-full font-sans`}
      >
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
                  <DashboardDataTable
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
                  <DashboardDataTable
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
    </>
  );
}
