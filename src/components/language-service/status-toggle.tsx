"use client";

import { useState } from "react";
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
import { api } from "~/trpc/react";
import { Loader2 } from "lucide-react";

interface LanguageServiceStatusDialogProps {
  languageServiceId: string;
  status: boolean;
}

export const LanguageServiceStatusDialog = ({
  languageServiceId,
  status,
}: LanguageServiceStatusDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const utils = api.useUtils();
  const updateStatus = api.languageService.updateStatus.useMutation({
    onSuccess: () => {
      void utils.languageService.getAllLanguageServices.invalidate();
      setOpen(false);
    },
  });

  const handleStatusUpdate = async () => {
    try {
      setIsLoading(true);
      await updateStatus.mutateAsync({
        languageServiceId,
        status: !status,
      });
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 px-2 py-2 text-sm"
        >
          {status ? "Deactivate" : "Activate"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {status ? "Deactivate Language Service" : "Activate Language Service"}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to {status ? "deactivate" : "activate"} this
            language service? This action can be reversed later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant={status ? "destructive" : "default"}
            onClick={handleStatusUpdate}
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {status ? "Deactivate" : "Activate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}; 