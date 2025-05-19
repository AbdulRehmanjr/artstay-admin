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
import { DiningVoyageTable } from "~/components/dining-voyage/dining-voyage-table";

export const metadata = {
  title: "Artstay - DINING VOYAGE",
};

export const dynamic = 'force-dynamic'

export default function DiningVoyagePage() {
  void api.diningVoyage.getAllDiningVoyages.prefetch();

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
              <BreadcrumbPage>Dining Voyage</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Suspense fallback={<TableSkeleton headers={['Profile','Name','Cuisine','Location','Price Range','Rating','Actions']} />}>
        <DiningVoyageTable />
      </Suspense>
    </HydrateClient>
  );
} 