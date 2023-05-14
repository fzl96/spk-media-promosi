"use client";

import { useState, useMemo } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Icons } from "./icons";
import * as z from "zod";
import { CheckCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Criteria } from "@prisma/client";

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

interface AlternativeUpdateForm extends ButtonProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  criteria: Pick<Criteria, "id" | "code" | "name">[];
  alternative: Alternative;
}

export function AlternativeUpdateForm({
  className,
  setOpen,
  criteria,
  alternative,
  ...props
}: AlternativeUpdateForm) {
  const router = useRouter();
  const criteriaSorted = useMemo(() => {
    return criteria.sort((a, b) => {
      const numA = parseInt(a.code.slice(1));
      const numB = parseInt(b.code.slice(1));

      return numA - numB;
    });
  }, [criteria]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: alternative.name,
      evaluation: criteriaSorted.map((c) => ({
        criteriaId: c.id,
        nilai:
          alternative.evaluation.find((e) => e.criteriaId === c.id)?.nilai || 0,
      })),
    },
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setIsSaving(true);
    const res = await fetch(`/api/alternative/${alternative.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    setIsSaving(false);
    if (!res.ok) {
      const response = await res.json();
      return toast({
        title: "Terjadi kesalahan.",
        description: response?.error || "Gagal menambahkan kriteria.",
        variant: "destructive",
      });
    }
    toast({
      description: (
        <h1 className="flex items-center gap-3">
          <CheckCircle className="text-green-600 " />
          <span>Alternatif berhasil diupdate.</span>
        </h1>
      ),
    });
    router.refresh();
    setOpen(false);
  };

  return (
    <form className={cn(className)} onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nama Alternatif
          </Label>
          <Input
            id="name"
            placeholder="Nama alternatif"
            className="col-span-3"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <p className="px-1  col-span-3 text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>
        {criteriaSorted.map((c, i) => (
          <div key={c.id} className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={c.name} className="flex gap-2 items-center">
              <span>{c.name}</span>
            </Label>
            <Input
              id={c.name}
              placeholder={c.name}
              className="col-span-3"
              type="number"
              {...register(`evaluation.${i}.nilai`, {
                valueAsNumber: true,
              })}
            />
          </div>
        ))}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="secondary">Cancel</Button>
        </DialogClose>
        <button
          type="submit"
          className={cn(buttonVariants(), className)}
          disabled={isSaving}
        >
          {isSaving && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          <span>Save</span>
        </button>
      </DialogFooter>
    </form>
  );
}
