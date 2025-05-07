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
import { TravelPlanerTable } from "~/components/travel/travel-table";

export const metadata = {
  title: "Artstay - TRAVEL PLANNER",
};

export const dynamic = "force-dynamic";

export default function TravelPlanerPage() {
  void api.travelPlaner.getAllTravels.prefetch();

  return (
    <HydrateClient>
      <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Travel Planners</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      <Suspense fallback={<TableSkeleton headers={['Profile','Name','Location','Languages','Price Range','Status','Action']} />}>
        <TravelPlanerTable />
      </Suspense>
    </HydrateClient>
  );
}