"use client";

import { useState } from "react";
import Image from "next/image";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Search,
  SlidersHorizontal,
  Eye,
  Pen,
  Trash2,
  ArrowUpDown,
  Download,
  GraduationCap,
  Award,
} from "lucide-react";
import { api } from "~/trpc/react";
import { Badge } from "~/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ArtisanStatusDialog } from "./status-toggle";

// Define interfaces to help TypeScript
interface CraftProps {
  craftName: string;
  craftId: string;
}

interface SubCraftProps {
  subCraftName: string;
  subCraftId: string;
}

interface ArtisanDetailProps {
  artisanId: string;
  firstName: string;
  dp: string;
  craft: CraftProps;
  subCraft: SubCraftProps;
  experience: string;
  education?: string;
  address: string;
  training?: string;
  certificate?: string;
  isActive: boolean;
}

const columns: ColumnDef<ArtisanDetailProps>[] = [
  {
    accessorKey: "dp",
    header: "Profile",
    cell: ({ row }) => (
      <div className="relative h-12 w-12 overflow-hidden rounded-lg border-2 border-white shadow-sm">
        <Image
          src={row.original.dp == "" ? "/placeholder.png" : row.original.dp}
          alt="artisan profile"
          fill
          className="object-cover transition-transform hover:scale-110"
          sizes="48px"
        />
      </div>
    ),
    enableSorting: false,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-mx-2 h-8 px-2 font-medium"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div>
          <div className="font-semibold text-gray-900">
            {row.getValue("firstName")}
          </div>
          <div className="text-sm text-gray-500">
            {row.original.isActive ? (
              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                Active
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20 ring-inset">
                Inactive
              </span>
            )}
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "craft",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-mx-2 h-8 px-2 font-medium"
        >
          Craft
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const craft: CraftProps = row.getValue("craft");
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
          {craft.craftName}
        </Badge>
      );
    },
  },
  {
    accessorKey: "subCraft",
    header: "Specialization",
    cell: ({ row }) => {
      const subCraft: SubCraftProps = row.getValue("subCraft");
      return (
        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
          {subCraft.subCraftName}
        </Badge>
      );
    },
  },
  {
    accessorKey: "experience",
    header: "Experience",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[200px] truncate font-medium">
              {row.getValue("experience")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("experience")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "education",
    header: "Education",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[150px] truncate">
              {row.getValue("education") ?? (
                <span className="text-gray-400 italic">Not specified</span>
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("education") ?? "Not specified"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    accessorKey: "address",
    header: "Location",
    cell: ({ row }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="max-w-[150px] truncate text-sm text-gray-600">
              {row.getValue("address")}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{row.getValue("address")}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: "qualifications",
    header: "Qualifications",
    cell: ({ row }) => {
      const artisan = row.original;
      const qualifications = [];
      if (artisan.education) qualifications.push(artisan.education);
      if (artisan.training) qualifications.push(artisan.training);
      if (artisan.certificate) qualifications.push(artisan.certificate);

      return (
        <div className="flex items-center gap-1">
          {artisan.education && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="gap-1">
                    <GraduationCap className="h-3 w-3" />
                    {artisan.education.substring(0, 3)}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Education: {artisan.education}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {artisan.certificate && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="gap-1">
                    <Award className="h-3 w-3" />
                    Cert
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Certificate: {artisan.certificate}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {qualifications.length === 0 && (
            <span className="text-sm text-gray-400">None</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="-mx-2 h-8 px-2 font-medium"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Badge variant={row.getValue("isActive") ? "default" : "destructive"}>
          {row.getValue("isActive") ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 rounded-full p-0 hover:bg-gray-100"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem className="cursor-pointer gap-2">
                <Eye className="h-4 w-4" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer gap-2">
                <Pen className="h-4 w-4" />
                Edit Details
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <ArtisanStatusDialog
                  artisanId={row.original.artisanId}
                  status={row.original.isActive}
                />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive cursor-pointer gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Artisan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export const ArtisanTable = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [globalFilter, setGlobalFilter] = useState("");

  const [artisans, { refetch }] = api.artisan.getAllArtisans.useSuspenseQuery();

  const table = useReactTable({
    data: artisans ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
      globalFilter,
    },
  });

  return (
    <div className="space-y-6 rounded-lg bg-white p-6 shadow-sm">
      {/* Header Section */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Artisan Directory
          </h2>
          <p className="text-sm text-gray-500">
            Manage and view all registered artisans
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2"
          >
            Refresh
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative max-w-sm flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
          <Input
            placeholder="Search artisans by name, craft, or specialization..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="h-10 border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value: string) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-10 w-[130px]">
              <SelectValue placeholder="Page size" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  Show {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10 gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  const columnName =
                    column.id.charAt(0).toUpperCase() + column.id.slice(1);
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {columnName.replace(/([A-Z])/g, " $1").trim()}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-50 hover:bg-gray-50"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-12 font-semibold text-gray-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="transition-colors hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Search className="h-8 w-8 text-gray-400" />
                    <span className="text-gray-500">No artisans found</span>
                    <span className="text-sm text-gray-400">
                      Try adjusting your search or filter
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                  table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length,
              )}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            results
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-9 px-3"
          >
            ← Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-9 px-3"
          >
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
};
