"use client";

import { api } from "~/trpc/react";
import { Hammer, Calendar, Tag, Loader2, } from "lucide-react";
import dayjs from "dayjs";
import { Badge } from "~/components/ui/badge";
import { EditSubCraftDialog } from "~/components/craft/sub/sub-edit";

export const SubCraftsList = ({ craftId }: { craftId: string }) => {
  const [subCrafts, { error }] =
    api.craft.getAllSubCraftsByCraftId.useSuspenseQuery({ craftId });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="bg-destructive/10 text-destructive rounded-full p-3">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
        <h3 className="mt-4 text-base font-semibold">
          Error Loading SubCrafts
        </h3>
        <p className="text-muted-foreground mt-2 max-w-md text-sm">
          We couldn&apos;t load the subcrafts for this craft. Please try again
          later.
        </p>
      </div>
    );
  }

  if (!subCrafts || subCrafts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <div className="bg-muted rounded-full p-3">
          <Hammer className="text-muted-foreground h-6 w-6" />
        </div>
        <h3 className="mt-4 text-base font-semibold">No SubCrafts Found</h3>
        <p className="text-muted-foreground mt-2 max-w-md text-sm">
          This craft doesn&apos;t have any subcrafts yet. Add your first
          subcraft to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {subCrafts.map((subCraft) => (
        <div
          key={subCraft.subCraftId}
          className="bg-card rounded-md border p-4 transition-shadow hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hammer className="text-primary h-5 w-5" />
              <h3 className="font-medium">{subCraft.subCraftName}</h3>
            </div>
            <Badge variant="outline" className="text-xs">
              SubCraft
            </Badge>
          </div>

          <div className="mt-3 space-y-2">
            <div className="text-muted-foreground flex items-center text-sm">
              <Tag className="mr-2 h-4 w-4" />
              <span>{subCraft.subCraftSlug}</span>
            </div>

            <div className="text-muted-foreground flex items-center gap-x-4 text-xs">
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>
                  Created: {dayjs(subCraft.createdAt).format("DD.MM.YYYY")}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>
                  Updated: {dayjs(subCraft.updatedAt).format("DD.MM.YYYY")}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
           <EditSubCraftDialog subCraft={subCraft} />
          </div>
        </div>
      ))}
    </div>
  );
};
