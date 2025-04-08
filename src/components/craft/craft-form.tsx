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
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

const craftFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type CraftFormValues = z.infer<typeof craftFormSchema>;

export const CraftFormDialog = () => {
  const utils = api.useUtils();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<CraftFormValues>({
    resolver: zodResolver(craftFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const createCraft = api.craft.create.useMutation({
    onSuccess: async () => {
      toast.success("Craft created successfully");
      setIsOpen(false);
      form.reset();
      await utils.craft.getAll.refetch();
    },
    onError: () => {
      toast.error("Failed to create craft");
    },
  });

  const onSubmit = (data: CraftFormValues) => {
    createCraft.mutate({ craftName: data.name });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Craft
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Craft</DialogTitle>
          <DialogDescription>
            Create a new craft to the system.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter craft name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={createCraft.isPending}>
                {createCraft.isPending ? "Creating..." : "Create Craft"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
