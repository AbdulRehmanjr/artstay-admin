import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export const TableSkeleton = ({ headers }: { headers: string[] }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-full max-w-sm" />
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((header, index) => (
                <TableHead key={index}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {headers.map((_, colIndex) => (
                  <TableCell key={colIndex}>
                    <Skeleton className="h-5 w-16" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  );
};
