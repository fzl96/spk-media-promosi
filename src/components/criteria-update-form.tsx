"use client";

import { useState } from "react";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icons } from "./icons";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { criteriaSchema } from "@/lib/validations/criteria";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Criteria } from "@prisma/client";
import { CheckCircle } from "lucide-react";

interface CriteriaCreateForm extends ButtonProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  criteria: Pick<Criteria, "id" | "code" | "name" | "type" | "weight">;
}

type FormData = z.infer<typeof criteriaSchema>;

export function CriteriaUpdateForm({
  className,
  setOpen,
  criteria,
  ...props
}: CriteriaCreateForm) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(criteriaSchema),
    defaultValues: {
      name: criteria.name,
      code: criteria.code,
      weight: criteria.weight,
    },
  });
  const options: string[] = ["Benefit", "Cost"];
  const [type, setType] = useState<string>(options[0]);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    setIsSaving(true);
    const res = await fetch(`/api/criteria/${criteria.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, type }),
    });
    setIsSaving(false);

    if (!res.ok) {
      const error = await res.json();
      return toast({
        title: "Terjadi kesalahan.",
        description: error?.error || "Kriteria gagal diperbarui.",
        variant: "destructive",
      });
    }

    toast({
      description: (
        <h1 className="flex items-center gap-3">
          <CheckCircle className="text-green-600 " />
          <span>Kriteria berhasil diperbarui.</span>
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
          <Label htmlFor="code" className="text-right">
            Kode Kriteria
          </Label>
          <Input
            id="code"
            placeholder="Kode Kriteria"
            className="col-span-3"
            type={type}
            {...register("code")}
          />
          {errors.code && (
            <p className="px-1  col-span-3 text-xs text-red-600">
              {errors.code.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Nama Kriteria
          </Label>
          <Input
            id="name"
            placeholder="Kode Kriteria"
            className="col-span-3"
            type={type}
            {...register("name")}
          />
          {errors.name && (
            <p className="px-1  col-span-3 text-xs text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="weight" className="text-right">
            Bobot Kriteria
          </Label>
          <Input
            id="weight"
            placeholder="Kode Kriteria"
            className="col-span-3"
            type={type}
            {...register("weight", {
              valueAsNumber: true,
            })}
          />
          {errors.weight && (
            <p className="px-1  col-span-3 text-xs text-red-600">
              {errors.weight.message}
            </p>
          )}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Jenis Kriteria
          </Label>
          <Select
            defaultValue={criteria.type}
            onValueChange={(value) => setType(value)}
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Pilih Jenis" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Jenis</SelectLabel>
                <SelectItem value="Benefit">Benefit</SelectItem>
                <SelectItem value="Cost">Cost</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
