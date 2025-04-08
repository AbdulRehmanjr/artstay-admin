import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import {
  Users,
  DollarSign,
  Building2,
  Calendar,
  Palette,
  CalendarDays,
  Hotel,
  Utensils,
  Plane,
  Car,
} from "lucide-react";
import { auth } from "~/server/auth";

export default async function AdminDashboard() {
  const session = await auth();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {session?.user?.adminEmail}
        </p>
      </div>

      {/* Overall Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-muted-foreground text-xs">
              +20% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231</div>
            <p className="text-muted-foreground text-xs">
              +15% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Listings
            </CardTitle>
            <Building2 className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-muted-foreground text-xs">
              +10% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bookings
            </CardTitle>
            <Calendar className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-muted-foreground text-xs">
              +25% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Artisan Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Artisan Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Artisans</span>
                <span className="font-bold">234</span>
              </div>
              <div className="flex justify-between">
                <span>Active</span>
                <span className="font-bold text-green-500">198</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-bold text-yellow-500">36</span>
              </div>
              <Button className="w-full">Manage Artisans</Button>
            </div>
          </CardContent>
        </Card>

        {/* Safari Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Safari Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Safaris</span>
                <span className="font-bold">156</span>
              </div>
              <div className="flex justify-between">
                <span>Active</span>
                <span className="font-bold text-green-500">142</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-bold text-yellow-500">14</span>
              </div>
              <Button className="w-full">Manage Safaris</Button>
            </div>
          </CardContent>
        </Card>

        {/* Fairs Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5" />
              Fairs Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Fairs</span>
                <span className="font-bold">45</span>
              </div>
              <div className="flex justify-between">
                <span>Active</span>
                <span className="font-bold text-green-500">38</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-bold text-yellow-500">7</span>
              </div>
              <Button className="w-full">Manage Fairs</Button>
            </div>
          </CardContent>
        </Card>

        {/* Hotel Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Hotel className="h-5 w-5" />
              Hotel Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Hotels</span>
                <span className="font-bold">89</span>
              </div>
              <div className="flex justify-between">
                <span>Active</span>
                <span className="font-bold text-green-500">75</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-bold text-yellow-500">14</span>
              </div>
              <Button className="w-full">Manage Hotels</Button>
            </div>
          </CardContent>
        </Card>

        {/* Restaurant Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="h-5 w-5" />
              Restaurant Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Restaurants</span>
                <span className="font-bold">112</span>
              </div>
              <div className="flex justify-between">
                <span>Active</span>
                <span className="font-bold text-green-500">98</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-bold text-yellow-500">14</span>
              </div>
              <Button className="w-full">Manage Restaurants</Button>
            </div>
          </CardContent>
        </Card>

        {/* Travel Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              Travel Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Total Travel Agencies</span>
                <span className="font-bold">67</span>
              </div>
              <div className="flex justify-between">
                <span>Active</span>
                <span className="font-bold text-green-500">58</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span className="font-bold text-yellow-500">9</span>
              </div>
              <Button className="w-full">Manage Travel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
