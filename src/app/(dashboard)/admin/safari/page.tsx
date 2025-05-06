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
import { SafariTable } from "~/components/safari/safari-table";
export const metadata = {
  title: "Artstay - SAFARI",
};

export const dynamic = "force-dynamic";
export default function SafariPage() {
  void api.safari.getAllSafaris.prefetch();

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
              <BreadcrumbPage>Safari Guides</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Suspense fallback={<TableSkeleton headers={['Profile','Name','Location','Status','Action']} />}>
        <SafariTable />
      </Suspense>
    </HydrateClient>
  );
}
