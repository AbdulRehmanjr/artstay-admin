import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
  BreadcrumbList,
} from "~/components/ui/breadcrumb";
import { api, HydrateClient } from "~/trpc/server";
import { TableSkeleton } from "~/components/skeletons/table";
import { ArtisanTable } from "~/components/artisan/artisan-table";

export const metadata = {
  title: "Artstay - ARTISAN",
};

export const dynamic = "force-dynamic";
export default function ArtisanPage() {
  void api.artisan.getAllArtisans.prefetch();

  return (
    <HydrateClient>
      <div className="mb-6 space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Artisans</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Suspense fallback={<TableSkeleton headers={['Profile','Name','Craft','Specialization','Experience','Education','Location','Action']} />}>
        <ArtisanTable />
      </Suspense>
    </HydrateClient>
  );
}