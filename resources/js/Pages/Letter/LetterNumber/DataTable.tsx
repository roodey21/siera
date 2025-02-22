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
import FormCreate from "@/components/letter-number/form-create"
// import { useRouter } from "next/navigation"
import { FileText, Search } from "lucide-react"
import { LetterType } from "@/types/types"
import { router } from "@inertiajs/react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    letterTypes?: LetterType[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
    letterTypes
}: DataTableProps<TData, TValue>) {
    const [dialogFormIsOpen, setDialogFormIsOpen] = useState(false)
    // const [filtering, setFiltering] = useState("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    const handleSuccess = () => {
        setDialogFormIsOpen(false)
        router.reload()
    }

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <div className="flex gap-2">
                    <div className="relative flex-1 ml-auto md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter berdasarkan kode"
                            // value={filtering}
                            // onChange={(event) =>
                            //     setFiltering(event.target.value)
                            // }
                            value={(table.getColumn("code")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("code")?.setFilterValue(event.target.value)
                            }
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                    {/* <FilterButton updateFilter={(val) => {
                        table.getColumn("code")?.setFilterValue(val)
                    }} options={letterTypes.map((item) => { return { label: item.name, value: item.name.toLocaleLowerCase() } })} label="Tipe Surat" /> */}
                </div>
                <div className="flex items-center justify-end gap-2">
                    {/* <Button variant="outline" onClick={() => router.get(route('letter-number.generate-document'))}>
                        <FileText /> Generate Dokumen
                    </Button> */}
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
                            <FormCreate
                                letterTypes={letterTypes}
                                handleSuccess={handleSuccess}
                            />
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

