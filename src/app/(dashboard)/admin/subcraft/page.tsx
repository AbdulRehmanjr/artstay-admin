import { BreadcrumbItem,BreadcrumbLink,Breadcrumb, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbList } from "~/components/ui/breadcrumb";
import { api, HydrateClient } from "~/trpc/server";
import { CraftListSkeleton } from "~/components/skeletons/craft-list";
import { Suspense } from "react";
import { SubCraftsList } from "~/components/craft/sub/sub-list";
import { AddSubCraftDialog } from "~/components/craft/sub/sub-create";

type SubCraftPageProps = {
  searchParams: Promise<{ craftId: string }>;
};
export default async function SubCraftPage({ searchParams }: SubCraftPageProps) {
  const craftProps = await searchParams;
  void api.craft.getAllSubCraftsByCraftId.prefetch({ craftId: craftProps.craftId });
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
              <BreadcrumbPage>Sub Crafts</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <AddSubCraftDialog craftId={craftProps.craftId} />
      </div>
      <Suspense fallback={<CraftListSkeleton />}>
        <SubCraftsList craftId={craftProps.craftId} />
      </Suspense>
    </HydrateClient>
  );
}
