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

type ComponentProps = {
    restaurantId: string;
    status: boolean;
}

export const DiningVoyageStatusDialog = ({
    restaurantId,
    status,
}: ComponentProps) => {
    const [open, setOpen] = useState(false);

    const utils = api.useUtils();
    const updateStatus = api.diningVoyage.updateStatus.useMutation({
        onSuccess: async () => {
            await utils.diningVoyage.getAllDiningVoyages.refetch();
            setOpen(false);
        },
    });

    const handleStatusUpdate = () => {
        updateStatus.mutate(
            {
                restaurantId,
                status: !status,
            },

        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="w-full cursor-pointer justify-start gap-2 px-2 py-1.5 text-sm"
                >
                    {status ? "Deactivate" : "Activate"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {status ? "Deactivate Dining Voyage" : "Activate Dining Voyage"}
                    </DialogTitle>
                    <DialogDescription>
                        Are you sure you want to {status ? "deactivate" : "activate"} this
                        dining voyage? This action can be reversed later.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={updateStatus.isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant={status ? "destructive" : "default"}
                        onClick={handleStatusUpdate}
                        disabled={updateStatus.isPending}
                    >
                        {updateStatus.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {status ? "Deactivate" : "Activate"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}; 