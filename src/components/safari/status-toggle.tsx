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
  safariId: string;
  status: boolean;
};

export const SafariStatusDialog = ({ safariId, status }: ComponentProps) => {
  const utils = api.useUtils();
  const [open, setOpen] = useState<boolean>(false);

  const toggleStatus = api.safari.toggleStatus.useMutation({
    onSuccess: async () => {
      toast("Status updated successfully", {
        className: "bg-green-500 text-white",
      });
      await utils.safari.getAllSafaris.refetch();
    },
    onError: () => {
      toast("Error updating status", {
        className: "bg-red-500 text-white",
      });
    },
  });

  const handleStatusChange = () => {
    toggleStatus.mutate({ safariId, status: !status });
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
          <DialogTitle>Toggle Safari Guide Status</DialogTitle>
          <DialogDescription>
            Are you sure you want to change this safari guide&apos;s status to{" "}
            <span className="font-medium">
              {status ? "inactive" : "active"}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            Safari ID: <span className="font-medium">{safariId}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Current Status:{" "}
            <span className="font-medium">
              {status ? "Active" : "Inactive"}
            </span>
          </p>
          <p className="mt-2 text-sm italic text-muted-foreground">
            Changing a safari guide&apos;s status affects their visibility in tours
            and their ability to be booked by customers.
          </p>
        </div>
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