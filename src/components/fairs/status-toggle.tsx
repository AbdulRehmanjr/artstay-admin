"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { toast } from "sonner";
import { api } from "~/trpc/react";

type ComponentProps = {
  fairId: string;
  status: boolean;
};

export const FairStatusDialog = ({ fairId, status }: ComponentProps) => {
  const utils = api.useUtils();
  const [open, setOpen] = useState<boolean>(false);

  const toggleStatus = api.fair.toggleStatus.useMutation({
    onSuccess: async () => {
      toast("Status updated successfully", {
        className: "bg-green-500 text-white",
      });
      await utils.fair.getAllFairs.refetch();
    },
    onError: () => {
      toast("Error updating status", {
        className: "bg-red-500 text-white",
      });
    },
  });

  const handleStatusChange = () => {
    toggleStatus.mutate({ fairId, status: !status });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {status ? "Deactivate" : "Activate"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Toggle Fair Organizer Status</DialogTitle>
          <DialogDescription>
            Are you sure you want to change this fair organizer&apos;s status to{" "}
            <span className="font-medium">
              {status ? "inactive" : "active"}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={toggleStatus.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleStatusChange}
            disabled={toggleStatus.isPending}
            variant={status ? "destructive" : "default"}
          >
            {toggleStatus.isPending
              ? "Updating..."
              : status
                ? "Deactivate"
                : "Activate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};