"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { Pencil, Loader2 } from "lucide-react";

const craftFormSchema = z.object({
  craftName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type CraftFormValues = z.infer<typeof craftFormSchema>;

type EditCraftDialogProps = {
  craft: CraftProps;
};

export const EditCraftDialog = ({ craft }: EditCraftDialogProps) => {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<CraftFormValues>({
    resolver: zodResolver(craftFormSchema),
  });

  useEffect(() => {
    form.setValue("craftName", craft.craftName);
  }, [craft, form]);

  const updateCraft = api.craft.update.useMutation({
    onSuccess: async () => {
      toast.success("Craft updated successfully");
      setIsOpen(false);
      await utils.craft.getAll.refetch();
    },
    onError: (error) => {
      toast.error(`Failed to update craft: ${error.message}`);
    },
  });

  const onSubmit = (data: CraftFormValues) => {
    updateCraft.mutate({
      craftId: craft.craftId,
      craftName: data.craftName,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" >
          <Pencil />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Craft</DialogTitle>
          <DialogDescription>
            Update the details of this craft.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="craftName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Craft Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Pottery, Woodworking" {...field} />
                  </FormControl>
                  <FormDescription>
                    The display name of the craft.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={updateCraft.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateCraft.isPending}>
                {updateCraft.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Craft"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
