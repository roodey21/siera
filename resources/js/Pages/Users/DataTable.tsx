import { flexRender, getFilteredRowModel, getSortedRowModel } from "@tanstack/react-table"
import { ColumnDef, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FilterButton } from "@/components/data-table/filter-button"
import FormCreate from "@/components/user/form-create"
import FormEdit from "@/components/user/form-edit"
import { FileText, Search } from "lucide-react"
import { Department, LetterType, Role, User } from "@/types/types"
import { router } from "@inertiajs/react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useMemo, useState } from "react"
import { columns } from "./Columns"

interface DataTableProps<TData, TValue> {
    data: User[]
    departments?: Department[]
    onEdit: (user: User) => void
    onDelete: (user: User) => void
    roles: Role[]
}

export function DataTable<TData, TValue>({
    data,
    departments,
    onEdit,
    onDelete,
    roles
}: DataTableProps<TData, TValue>) {
    const [dialogFormIsOpen, setDialogFormIsOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)

    const tableColumns = useMemo(() => columns(onEdit, onDelete), [onEdit, onDelete])
    const table = useReactTable({
        data,
        columns: tableColumns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    })

    const handleSuccess = () => {
        setDialogFormIsOpen(false)
        router.reload()
    }

    const handleEdit = (user: User) => {
        setSelectedUser(user)
    }

    const handleEditSuccess = () => {
        router.reload()
    }

    const closeFormCreate = () => {
        setDialogFormIsOpen(false)
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <div className="flex gap-2">
                    {/* <div className="relative flex-1 ml-auto md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter berdasarkan nama"
                            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("name")?.setFilterValue(event.target.value)
                            }
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div> */}
                </div>
                <div className="flex items-center justify-end gap-2">
                    <Dialog
                        open={dialogFormIsOpen} onOpenChange={setDialogFormIsOpen}
                    >
                        <DialogTrigger asChild>
                            <Button>
                                Buat Baru
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Buat Nomor Surat Baru</DialogTitle>
                                <DialogDescription />
                            </DialogHeader>
                            <FormCreate onSuccess={closeFormCreate} departments={departments} roles={roles}/>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
            <div className="border rounded-md bg-background">
                <Table className="w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
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
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end py-4 space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}

