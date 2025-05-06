"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { toast } from "sonner";
import { Trash2, Loader2 } from "lucide-react";

type DeleteCraftDialogProps = {
  craft: CraftProps;
};

export const DeleteCraftDialog = ({ craft }: DeleteCraftDialogProps) => {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const deleteCraft = api.craft.delete.useMutation({
    onSuccess: async () => {
      toast.success("Craft deleted successfully");
      setIsOpen(false);
      await utils.craft.getAll.refetch();
    },
    onError: (error) => {
      toast.error(`Failed to delete craft: ${error.message}`);
    },
  });

  const handleDelete = () => {
    deleteCraft.mutate({
      craftId: craft.craftId,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          type="button" 
          variant="destructive" 
          size="sm" 
        >
          <Trash2 />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Delete Craft</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this craft? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="my-4 rounded-md border border-destructive/30 bg-destructive/10 p-4">
          <p className="text-sm font-medium text-destructive">
            You are about to delete: <span className="font-semibold">{craft.craftName}</span>
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={deleteCraft.isPending}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleDelete} 
            disabled={deleteCraft.isPending}
          >
            {deleteCraft.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Craft"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};