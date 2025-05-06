"use client";

import Image from "next/image";
import {
  Home,
  Settings,
  Building,
  Calendar,
  Map,
  type LucideIcon,
  Pickaxe,
} from "lucide-react";
import { NavMain } from "~/components/sidebar/nav-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { NavUser } from "~/components/sidebar/nav-user";
import { useSession } from "next-auth/react";

type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
    isActive?: boolean;
  }[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const session = useSession();

  const navItems = useMemo(() => {
    const items: NavItem[] = [
      {
        title: "Dashboard",
        url: "/admin",
        icon: Home,
        isActive: pathname === "/admin",
      },
    ];

    // Get account type
    const accountType = session.data?.user?.accountType;

    if (accountType) {
      // Superadmin gets access to all sections with sub-menu items
      if (accountType === "SUPERADMIN") {
        items.push(
          {
            title: "Craft Management",
            url: "/admin/craft",
            icon: Pickaxe,
            isActive: pathname?.startsWith("/admin/craft"),
          },
          {
            title: "Artisan Management",
            url: "#",
            icon: Building,
            isActive: pathname?.startsWith("/admin/artisan"),
            items: [
              {
                title: "Artisan List",
                url: "/admin/artisan",
                isActive: pathname === "/admin/artisan",
              },
              {
                title: "Add Artisan",
                url: "/admin/artisan/add",
                isActive: pathname === "/admin/artisan/add",
              },
            ],
          },
          {
            title: "Fairs Management",
            url: "/dashboard/fairs",
            icon: Calendar,
            isActive: pathname?.startsWith("/dashboard/fairs"),
            items: [
              {
                title: "Fairs List",
                url: "/dashboard/fairs/list",
                isActive: pathname === "/dashboard/fairs/list",
              },
              {
                title: "Add Fair",
                url: "/dashboard/fairs/add",
                isActive: pathname === "/dashboard/fairs/add",
              },
            ],
          },
          {
            title: "Safari Management",
            url: "#",
            icon: Map,
            isActive: pathname?.startsWith("/admin/safari"),
            items: [
              {
                title: "Safari List",
                url: "/admin/safari",
                isActive: pathname === "/admin/safari",
              },
              {
                title: "Add Safari",
                url: "/admin/safari/add",
                isActive: pathname === "/admin/safari/add",
              },
            ],
          },
          {
            title: "Hotel Management",
            url: "/admin/hotels",
            icon: Building,
            isActive: pathname?.startsWith("/admin/hotels"),
            items: [
              {
                title: "Hotel List",
                url: "/admin/hotels/list",
                isActive: pathname === "/admin/hotels/list",
              },
              {
                title: "Add Hotel",
                url: "/admin/hotels/add",
                isActive: pathname === "/admin/hotels/add",
              },
            ],
          },
          {
            title: "Room Management",
            url: "/admin/rooms",
            icon: Building,
            isActive: pathname?.startsWith("/admin/rooms"),
            items: [
              {
                title: "Room List",
                url: "/admin/rooms/list",
                isActive: pathname === "/admin/rooms/list",
              },
              {
                title: "Add Room",
                url: "/admin/rooms/add",
                isActive: pathname === "/admin/rooms/add",
              },
            ],
          },
          {
            title: "Restaurant Management",
            url: "/admin/restaurants",
            icon: Building,
            isActive: pathname?.startsWith("/admin/restaurants"),
            items: [
              {
                title: "Restaurant List",
                url: "/admin/restaurants/list",
                isActive: pathname === "/admin/restaurants/list",
              },
              {
                title: "Add Restaurant",
                url: "/admin/restaurants/add",
                isActive: pathname === "/admin/restaurants/add",
              },
            ],
          },
          {
            title: "Travel Planning",
            url: "/admin/travel",
            icon: Map,
            isActive: pathname?.startsWith("/admin/travel"),
            items: [
              {
                title: "Travel Plans",
                url: "/admin/travel/plans",
                isActive: pathname === "/admin/travel/plans",
              },
              {
                title: "Add Plan",
                url: "/admin/travel/add",
                isActive: pathname === "/admin/travel/add",
              },
            ],
          },
        );
      } else {
        // Normal admin accounts get specific access based on their type
        switch (accountType) {
          case "ARTISAN_ADMIN":
            items.push({
              title: "Artisan Management",
              url: "/dashboard/artisan",
              icon: Building,
              isActive: pathname?.startsWith("/dashboard/artisan"),
              items: [
                {
                  title: "Artisan List",
                  url: "/dashboard/artisan/list",
                  isActive: pathname === "/dashboard/artisan/list",
                },
                {
                  title: "Add Artisan",
                  url: "/dashboard/artisan/add",
                  isActive: pathname === "/dashboard/artisan/add",
                },
              ],
            });
            break;

          case "FAIRS_ADMIN":
            items.push({
              title: "Fairs Management",
              url: "/dashboard/fairs",
              icon: Calendar,
              isActive: pathname?.startsWith("/dashboard/fairs"),
              items: [
                {
                  title: "Fairs List",
                  url: "/dashboard/fairs/list",
                  isActive: pathname === "/dashboard/fairs/list",
                },
                {
                  title: "Add Fair",
                  url: "/dashboard/fairs/add",
                  isActive: pathname === "/dashboard/fairs/add",
                },
              ],
            });
            break;

          case "SAFARI_ADMIN":
            items.push({
              title: "Safari Management",
              url: "/dashboard/safari",
              icon: Map,
              isActive: pathname?.startsWith("/dashboard/safari"),
              items: [
                {
                  title: "Safari List",
                  url: "/dashboard/safari/list",
                  isActive: pathname === "/dashboard/safari/list",
                },
                {
                  title: "Add Safari",
                  url: "/dashboard/safari/add",
                  isActive: pathname === "/dashboard/safari/add",
                },
              ],
            });
            break;

          case "HOTEL_ADMIN":
            items.push(
              {
                title: "Hotel Management",
                url: "/dashboard/hotels",
                icon: Building,
                isActive: pathname?.startsWith("/dashboard/hotels"),
                items: [
                  {
                    title: "Hotel List",
                    url: "/dashboard/hotels/list",
                    isActive: pathname === "/dashboard/hotels/list",
                  },
                  {
                    title: "Add Hotel",
                    url: "/dashboard/hotels/add",
                    isActive: pathname === "/dashboard/hotels/add",
                  },
                ],
              },
              {
                title: "Room Management",
                url: "/dashboard/rooms",
                icon: Building,
                isActive: pathname?.startsWith("/dashboard/rooms"),
                items: [
                  {
                    title: "Room List",
                    url: "/dashboard/rooms/list",
                    isActive: pathname === "/dashboard/rooms/list",
                  },
                  {
                    title: "Add Room",
                    url: "/dashboard/rooms/add",
                    isActive: pathname === "/dashboard/rooms/add",
                  },
                ],
              },
            );
            break;

          case "RESTAURANT_ADMIN":
            items.push({
              title: "Restaurant Management",
              url: "/dashboard/restaurants",
              icon: Building,
              isActive: pathname?.startsWith("/dashboard/restaurants"),
              items: [
                {
                  title: "Restaurant List",
                  url: "/dashboard/restaurants/list",
                  isActive: pathname === "/dashboard/restaurants/list",
                },
                {
                  title: "Add Restaurant",
                  url: "/dashboard/restaurants/add",
                  isActive: pathname === "/dashboard/restaurants/add",
                },
              ],
            });
            break;

          case "TRAVEL_PLANER_ADMIN":
            items.push({
              title: "Travel Planning",
              url: "/dashboard/travel",
              icon: Map,
              isActive: pathname?.startsWith("/dashboard/travel"),
              items: [
                {
                  title: "Travel Plans",
                  url: "/dashboard/travel/plans",
                  isActive: pathname === "/dashboard/travel/plans",
                },
                {
                  title: "Add Plan",
                  url: "/dashboard/travel/add",
                  isActive: pathname === "/dashboard/travel/add",
                },
              ],
            });
            break;
        }
      }
    }

    // Always add Settings as the last item
    items.push({
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
      isActive: pathname === "/dashboard/settings",
    });

    return items;
  }, [pathname, session.data?.user?.accountType]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="relative my-2 h-16 w-auto">
        <Image
          className="object-contain"
          src="/logo_1.png"
          alt="logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
