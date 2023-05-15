import { AlternativeCreateButton } from "@/components/alternative-create-button";
import AlternativeTable from "@/components/alternative-table";
import { DashboardHeader } from "@/components/header";
import { NoDataCard } from "@/components/no-data-card";
import { DashboardShell } from "@/components/shell";
import { Criteria } from "@prisma/client";
import { Suspense } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

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

  const disabled = criteria.length === 0;

  return (
    <div className="flex flex-col gap-5 overlfow-x-hidden max-w-full">
      <DashboardHeader heading="Alternatif">
        {!disabled ? (
          <AlternativeCreateButton criteria={criteria} disabled={disabled} />
        ) : (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  disabled={disabled}
                  className="text-sm p-3 flex items-center text-white rounded-md bg-[#878b94] cursor-not-allowed"
                >
                  <Icons.add className="w-4 h-4 mr-2" />
                  Tambah Alternatif
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tambah kriteria terlebih dahulu</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </DashboardHeader>
      {criteria.length > 0 && alternative.length > 0 ? (
        <AlternativeTable
          criteria={criteria}
          data={alternative}
          deleteEndpoint="/api/alternative"
        />
      ) : (
        <NoDataCard />
      )}
    </div>
  );
}
