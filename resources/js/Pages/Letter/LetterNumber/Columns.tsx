import { ColumnDef } from "@tanstack/react-table"
import { ArrowDownUp, ArrowUpDown, BadgeCheck, BadgeX, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Letter, LetterNumber } from "@/types/types"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"

export const columns: ColumnDef<LetterNumber>[] = [
  {
    accessorKey: "code",
    id: "code",
    header: ({ column }) => {
        return (
            <Button
                variant="ghost"
                size="sm"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Kode
                <ArrowDownUp className="w-4 h-4 ml-2" />
            </Button>
        )
    }
  },
  {
    accessorKey: "pic",
    header: "PIC",
  },
  {
    accessorKey: "description",
    header: "Perihal"
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowDownUp className="w-4 h-4 ml-2" />
        </Button>
      )},
    cell: ({ row }) => {
      return (
        <TooltipProvider
          delayDuration={200}
        >
          <Tooltip>
            <TooltipTrigger>
              {row.original.status === "used" ? (
                <BadgeCheck className="w-6 h-6 text-emerald-500" />
              ) : (
                <BadgeX className="w-6 h-6 text-gray-500" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              {row.original.status === "used" ? "Used" : "Unused"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  }
]
