"use client";

import { useState } from "react";
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
import { Loader2, Hammer } from "lucide-react";

const subCraftFormSchema = z.object({
  subCraftName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type SubCraftFormValues = z.infer<typeof subCraftFormSchema>;

type AddSubCraftDialogProps = {
  craftId: string;
};

export const AddSubCraftDialog = ({ craftId }: AddSubCraftDialogProps) => {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<SubCraftFormValues>({
    resolver: zodResolver(subCraftFormSchema),
    defaultValues: {
      subCraftName: "",
    },
  });

  const createSubCraft = api.craft.createSubCraft.useMutation({
    onSuccess: async () => {
      toast.success("SubCraft created successfully");
      setIsOpen(false);
      form.reset();
      await utils.craft.getAll.refetch();
      await utils.craft.getAllSubCraftsByCraftId.refetch({ craftId: craftId });
    },
    onError: (error) => {
      toast.error(`Failed to create SubCraft: ${error.message}`);
    },
  });

  const onSubmit = (data: SubCraftFormValues) => {
    createSubCraft.mutate({
      craftId: craftId,
      subCraftName: data.subCraftName,
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="sm"
        >
          <Hammer className="h-4 w-4" />
          Add SubCraft
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add SubCraft</DialogTitle>
          <DialogDescription>
            Create a new subcategory for the craft
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
                    <Input
                      placeholder="e.g. Wheel Throwing, Wood Carving"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The display name of this subcategory
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
                disabled={createSubCraft.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createSubCraft.isPending}>
                {createSubCraft.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create SubCraft"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
