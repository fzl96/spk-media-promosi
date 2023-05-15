"use client";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import React from "react";
import { Criteria } from "@prisma/client";
import { AlternativeCreateForm } from "./alternative-create-form";

interface AlternativeCreateButtonProps {
  criteria: Criteria[];
  disabled: boolean;
}

export function AlternativeCreateButton({
  criteria,
  disabled,
}: AlternativeCreateButtonProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} disabled={disabled}>
          <Icons.add className="w-4 h-4 mr-2" />
          Tambah Alternatif
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Alternatrive</DialogTitle>
          <DialogDescription>
            Tambah Alternatif baru dengan data-data kriteria. Klik save untuk
            menyimpan.
          </DialogDescription>
        </DialogHeader>
        <AlternativeCreateForm setOpen={setOpen} criteria={criteria} />
      </DialogContent>
    </Dialog>
  );
}
