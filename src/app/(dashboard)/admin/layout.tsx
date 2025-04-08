import { AppSidebar } from "~/components/sidebar/side-bar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { ResponsiveContent } from "~/components/sidebar/responsive-content";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <ResponsiveContent>
          <SidebarTrigger className="m-4" />
          <div className="m-4 grid gap-4 p-4 md:min-h-min">
            {children}
          </div>
        </ResponsiveContent>
      </SidebarInset>
    </SidebarProvider>
  );
}