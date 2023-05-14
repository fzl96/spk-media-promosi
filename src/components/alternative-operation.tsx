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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { Criteria } from "@prisma/client";
import { CheckCircle } from "lucide-react";
import { AlternativeUpdateForm } from "@/components/alternative-update-form";

async function deleteAlternative(id: string) {
  const res = await fetch(`/api/alternative/${id}`, {
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
    <span>Alternative berhasil dihapus.</span>
  </h1>;

  return true;
}

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

interface AlternativeOperationProps {
  alternative: Alternative;
  criteria: Criteria[];
}

export function AlternativeOperation({
  alternative,
  criteria,
}: AlternativeOperationProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
  const [isDeleteLoading, setIsDeleteLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Alternative</DialogTitle>
            <DialogDescription>
              Edit alternative dengan mengisi kode, nama, bobot, dan jenis
              kriteria. Klik save untuk menyimpan.
            </DialogDescription>
          </DialogHeader>
          <AlternativeUpdateForm
            setOpen={setOpen}
            alternative={alternative}
            criteria={criteria}
          />
          {/* <CriteriaUpdateForm setOpen={setOpen} criteria={criteria} /> */}
        </DialogContent>
      </Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
          <Icons.ellipsis className="h-4 w-4" />
          <span className="sr-only">Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <button onClick={() => setOpen(true)}>Edit Alternative</button>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="flex cursor-pointer items-center text-destructive focus:text-destructive"
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event: any) => {
                event.preventDefault();
                setIsDeleteLoading(true);

                const deleted = await deleteAlternative(alternative.id);

                if (deleted) {
                  setIsDeleteLoading(false);
                  setShowDeleteAlert(false);
                  router.refresh();
                }
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
