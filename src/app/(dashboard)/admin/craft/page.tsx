import { Suspense } from "react";
import { CraftList } from "~/components/craft/craft-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbList,
} from "~/components/ui/breadcrumb";
import { api, HydrateClient } from "~/trpc/server";
import { CraftListSkeleton } from "~/components/skeletons/craft-list";
import { CraftFormDialog } from "~/components/craft/craft-form";

export const dynamic = "force-dynamic";

export default function CraftPage() {
  void api.craft.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="mb-6 space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Crafts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <CraftFormDialog />
      </div>
      <Suspense fallback={<CraftListSkeleton />}>
        <CraftList />
      </Suspense>
    </HydrateClient>
  );
}
