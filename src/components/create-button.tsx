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
import { CriteriaCreateForm } from "./criteria-create-form";

interface CreateButtonProps {}

export function CreateButton({}: CreateButtonProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Icons.add className="w-4 h-4 mr-2" />
          Tambah Kriteria
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kriteria</DialogTitle>
          <DialogDescription>
            Tambah kriteria baru dengan mengisi kode, nama, bobot, dan jenis
            kriteria. Klik save untuk menyimpan.
          </DialogDescription>
        </DialogHeader>
        <CriteriaCreateForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
