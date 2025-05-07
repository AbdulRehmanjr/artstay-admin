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
import { FairTable } from "~/components/fairs/fair-table";

export const metadata = {
  title: "Artstay - FAIR",
};

export const dynamic = "force-dynamic";

export default function FairPage() {
  void api.fair.getAllFairs.prefetch();

  return (
    <HydrateClient>
       <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Fair Organizers</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      <Suspense fallback={<TableSkeleton headers={['Profile','Name','Location','Joined','Status','Action']} />}>
        <FairTable />
      </Suspense>
    </HydrateClient>
  );
}