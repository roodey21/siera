import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ArrowUpRight, CalendarIcon, CirclePlus, CopyIcon, ListFilter, MoreHorizontal, Search } from "lucide-react"
import { DatePickerWithRange } from '@/components/ui/daterange-picker';
import { Skeleton } from "@/components/ui/skeleton"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

import FormCreate from "@/components/letter-number/form-create"
// import FormEdit from "./form-edit"
import { LetterNumber, LetterType } from "@/types/types"
import { useForm } from "react-hook-form"
import { router } from "@inertiajs/react"

type LetterNumberProps = {
    letterNumbers: LetterNumber[]
    letterTypes: LetterType[]
}

const LetterNumberTable = ({ letterNumbers, letterTypes }: LetterNumberProps) => {
    const { handleSubmit, formState } = useForm()

    const [searchQuery, setSearchQuery] = React.useState<string>("")
    const [selectedCategory, setSelectedCategory] = React.useState<string>("")
    const [editLetterNumber, setEditLetterNumber] = React.useState<LetterNumber | null>(null)
    const [deleteLetterNumber, setDeleteLetterNumber] = React.useState<LetterNumber | null>(null);
    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = React.useState<boolean>(false);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value)
    }

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value)
        console.log(value)
    }

    const filteredLetterNumbers = letterNumbers.filter((letterNumber) => {
        const matchesSearchQuery = letterNumber.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            letterNumber.pic.toLowerCase().includes(searchQuery.toLowerCase()) ||
            letterNumber.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            letterNumber.status.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = selectedCategory === "" || letterNumber.letter_type.id.toString() === selectedCategory
        return matchesSearchQuery && matchesCategory
    })

    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center">
                    <div className="flex gap-3">
                        <Select onValueChange={handleCategoryChange}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Filter Berdasarkan" />
                            </SelectTrigger>
                            <SelectContent>
                                {letterTypes.map((letterType, index) => (
                                    <SelectItem value={letterType.id.toString()} key={index}>{letterType.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="relative ml-auto flex-1 md:grow-0">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                            />
                        </div>
                    </div>
                    <FormCreate
                        handleSuccess={() => router.reload()}
                        letterTypes={letterTypes}
                    />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nomor Surat</TableHead>
                                <TableHead>PIC</TableHead>
                                <TableHead>Perihal</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="relative">
                            {filteredLetterNumbers.map((letterNumber) => (
                                <TableRow key={letterNumber.id}>
                                    <TableCell>
                                        <div className="break-all line-clamp-1 hover:line-clamp-none">
                                            {letterNumber.code}
                                        </div>
                                    </TableCell>
                                    <TableCell>{letterNumber.pic}</TableCell>
                                    <TableCell>{letterNumber.description}</TableCell>
                                    <TableCell>
                                        <Badge variant={"outline"}>
                                            {letterNumber.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setEditLetterNumber(letterNumber)
                                                    }}
                                                >Edit</DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="cursor-pointer"
                                                    onClick={() => {
                                                        setDeleteLetterNumber(letterNumber)
                                                        setIsDialogDeleteOpen(true)
                                                    }}
                                                    disabled={letterNumber.status === "used"}>Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nomor Surat</TableHead>
                                <TableHead>PIC</TableHead>
                                <TableHead>Perihal</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>No. 001/LPPHOTEL-GMINTERN/I/2024</TableCell>
                                <TableCell>John Doe</TableCell>
                                <TableCell>Lorem ipsum dolor sit amet.</TableCell>
                                <TableCell>Used</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                aria-haspopup="true"
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> */}
                </CardContent>
            </Card>
            {/* {editLetterNumber && (
                <FormEdit
                    letterNumber={editLetterNumber}
                    letterTypes={letterTypes}
                    onSuccess={() => {
                        setEditLetterNumber(null)
                        router.refresh()
                    }}
                    onClose={() => {
                        setTimeout(() => {
                        }, 2000);
                        setEditLetterNumber(null)
                    }}
                />
            )} */}
            {/* <Dialog open={isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
                <DialogContent>
                    <form onSubmit={handleSubmit(handleDelete)}>
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Hapus</DialogTitle>
                            <DialogDescription>
                                Apakah anda yakin ingin menghapus nomor surat <br />
                                <span className="font-semibold">{deleteLetterNumber?.code}</span>? <br />
                                Tindakan ini tidak dapat dibatalkan.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="ghost" type="reset" onClick={() => setIsDialogDeleteOpen(false)}>Cancel</Button>
                            <Button variant="destructive" type="submit" disabled={formState.isSubmitting}>
                                {formState.isSubmitting && (<div className="w-4 h-4 border-2 border-t-[#4b5563] mr-2 rounded-full animate-spin"></div>)}
                                Delete
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog> */}
        </>
    )
}

export default LetterNumberTable
