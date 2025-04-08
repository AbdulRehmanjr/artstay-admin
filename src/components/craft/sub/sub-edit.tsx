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
  subCraftName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type CraftFormValues = z.infer<typeof craftFormSchema>;

type EditSubCraftDialogProps = {
  subCraft: SubCraftProps;
};

export const EditSubCraftDialog = ({ subCraft }: EditSubCraftDialogProps) => {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<CraftFormValues>({
    resolver: zodResolver(craftFormSchema),
  });

  useEffect(() => {
    form.setValue("subCraftName", subCraft.subCraftName);
  }, [subCraft, form]);

  const updateSubCraft = api.craft.updateSubCraft.useMutation({
    onSuccess: async () => {
      toast.success("SubCraft updated successfully");
      setIsOpen(false);
      await utils.craft.getAllSubCraftsByCraftId.refetch({ craftId: subCraft.craftId });
    },
    onError: (error) => {
        toast.error(`Failed to update SubCraft: ${error.message}`);
    },
  });

  const onSubmit = (data: CraftFormValues) => {
    updateSubCraft.mutate({
      subCraftId: subCraft.subCraftId,
      subCraftName: data.subCraftName,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="h-9">
          <Pencil className="mr-2 h-4 w-4" />
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
              name="subCraftName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SubCraft Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Pottery, Woodworking" {...field} />
                  </FormControl>
                  <FormDescription>
                    The display name of the sub-craft.
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
                disabled={updateSubCraft.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateSubCraft.isPending}>
                {updateSubCraft.isPending ? (
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
