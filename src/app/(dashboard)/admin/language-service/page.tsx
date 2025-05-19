import { Suspense } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { api, HydrateClient } from "~/trpc/server";
import { LanguageServiceTable } from "~/components/language-service/language-service-table";
import { TableSkeleton } from "~/components/skeletons/table";

export const metadata = {
    title: "Artstay - LANGUAGE SERVICE",
};

export const dynamic = "force-dynamic";

export default async function LanguageServicePage() {
    await api.languageService.getAllLanguageServices.prefetch();

    return (
        <HydrateClient>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Language Service</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Suspense fallback={<TableSkeleton headers={[
                "Profile", 'Name', 'Language', 'Specialization', 'HourlyRate', 'Location', 'Actions'
            ]} />}>
                <LanguageServiceTable />
            </Suspense>
        </HydrateClient>
    );
} 