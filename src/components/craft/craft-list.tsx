"use client";

import { api } from "~/trpc/react";
import { Palette, Calendar, Tag, ClipboardList, Eye } from "lucide-react";
import dayjs from "dayjs";
import { EditCraftDialog } from "~/components/craft/edit-craft";
import { DeleteCraftDialog } from "~/components/craft/delete-craft";
import { AddSubCraftDialog } from "~/components/craft/sub/sub-create";
import { Button } from "../ui/button";
import Link from "next/link";


export const CraftList = () => {
  const [crafts, { error }] = api.craft.getAll.useSuspenseQuery();

  if (error) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
        <ClipboardList className="text-muted-foreground/60 mb-4 h-12 w-12" />
        <p className="text-muted-foreground text-sm">
          Error loading crafts. Please try again later.
        </p>
      </div>
    );
  }

  if (!crafts?.length) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
        <Palette className="text-muted-foreground/60 mb-4 h-12 w-12" />
        <p className="text-base font-medium">No crafts found</p>
        <p className="text-muted-foreground mt-1 text-sm">
          Create your first craft to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {crafts.map((craft) => (
        <div
          key={craft.craftId}
          className="group bg-card text-card-foreground rounded-lg border shadow-sm transition-all hover:shadow-md"
        >
          <div className="p-6">
            <div className="flex items-center gap-2">
              <Palette className="text-primary h-5 w-5" />
              <h3 className="text-lg font-semibold">{craft.craftName}</h3>
            </div>

            <div className="mt-3 space-y-2">
              <div className="text-muted-foreground flex items-center text-sm">
                <Tag className="mr-2 h-4 w-4" />
                <span>{craft.craftSlug}</span>
              </div>

              {/* {craft.SubCraft && craft.SubCraft.length > 0 && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Hammer className="mr-2 h-4 w-4" />
                  <span>{craft.SubCraft.length} Sub-craft{craft.SubCraft.length !== 1 ? 's' : ''}</span>
                </div>
              )}
              
              {craft.Artisan && craft.Artisan.length > 0 && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{craft.Artisan.length} Artisan{craft.Artisan.length !== 1 ? 's' : ''}</span>
                </div>
              )}
               */}
              <div className="text-muted-foreground flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  Created {dayjs(craft.createdAt).format("DD.MM.YYYY")}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <AddSubCraftDialog craftId={craft.craftId} />

              <div className="ml-auto flex gap-2">
                <DeleteCraftDialog craft={craft} />
                <EditCraftDialog craft={craft} />
                <Button size="sm" asChild>
                  <Link href={`/admin/subcraft?craftId=${craft.craftId}`}>
                    <Eye  />
                    View
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
