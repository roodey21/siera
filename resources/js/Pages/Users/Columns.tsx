import { createColumnHelper } from "@tanstack/react-table";
import { ArrowDownUp, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/types";

const columnHelper = createColumnHelper<User>();

export const columns = (onEdit: (user: User) => void, onDelete: (user: User) => void) => [
  columnHelper.accessor("name", {
    id: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Nama
        <ArrowDownUp className="w-4 h-4 ml-2" />
      </Button>
    ),
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowDownUp className="w-4 h-4 ml-2" />
      </Button>
    ),
    cell: ({ row }) => (
        <>
            <Badge variant={row.original.status === "active" ? "default" : "destructive"}>
                {row.original.status === "active" ? "Aktif" : "Non Aktif"}
            </Badge>
            {row.original.deleted_at && (
                <Badge className="ml-2" variant="destructive">Deleted</Badge>
            )}
        </>
    ),
  }),
  columnHelper.display({
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Action</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onEdit(row.original)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onDelete(row.original)}>{row.original.deleted_at ? "Restore" : "Delete"}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  }),
];
