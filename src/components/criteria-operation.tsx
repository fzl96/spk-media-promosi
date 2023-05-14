import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import React from "react";
import { Criteria } from "@prisma/client";
import { CriteriaUpdateForm } from "./criteria-update-form";
import { CheckCircle } from "lucide-react";

async function deleteCriteria(id: string) {
  const res = await fetch(`/api/criteria/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    toast({
      title: "Terjadi kesalahan",
      description: error?.error || "Gagal menghapus kriteria",
      variant: "destructive",
    });
    return;
  }

  <h1 className="flex items-center gap-3">
    <CheckCircle className="text-green-600 " />
    <span>Kriteria berhasil dihapus.</span>
  </h1>;

  return true;
}

interface CriteriaOperationProps {
  criteria: Pick<Criteria, "id" | "code" | "name" | "type" | "weight">;
}

export function CriteriaOperation({ criteria }: CriteriaOperationProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Kriteria</DialogTitle>
            <DialogDescription>
              Edit kriteria dengan mengisi kode, nama, bobot, dan jenis
              kriteria. Klik save untuk menyimpan.
            </DialogDescription>
          </DialogHeader>
          <CriteriaUpdateForm setOpen={setOpen} criteria={criteria} />
        </DialogContent>
      </Dialog>
      <div className="flex gap-2">
        <Button onClick={() => setOpen(true)} variant="secondary" size="sm">
          <Icons.edit className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => setShowDeleteAlert(true)}
          className="bg-[#fbdddd] text-[#e96b6c] hover:bg-red-400 hover:text-white"
          size="sm"
        >
          <Icons.delete className="h-4 w-4" />
        </Button>
      </div>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Apakah anda yakin ingin menghapus ?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Aksi ini tidak bisa diurungkan.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event: any) => {
                event.preventDefault();
                setIsDeleteLoading(true);

                const deleted = await deleteCriteria(criteria.id);

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                }

                setIsDeleteLoading(false);
              }}
              className="bg-red-600 focus:ring-red-600"
            >
              {isDeleteLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.trash className="mr-2 h-4 w-4" />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
