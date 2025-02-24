import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from '@/components/ui/badge';
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Classification, Letter, LetterType } from '@/types/types';
import * as React from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Archive, ArchiveX, Circle, MoreVertical, Search, SlidersHorizontal, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
// import { FilterButton } from "@/components/filter-button";
import LetterDetail from "@/components/letter/letter-detail";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { addDays, format, isThisYear, isToday } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { Head, Link, router } from "@inertiajs/react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { DateRange } from "react-day-picker";
import { DatePickerWithRange } from "@/components/ui/daterange-picker";
import { formatGmailDate } from "@/helpers/formatDate";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import LetterCard from "@/components/letter/letter-card";

type InboxProps = {
    letters: Letter[]
    letterTypes: LetterType[]
    classifications: Classification[]
}

const Sent = ({ letters, letterTypes, classifications }: InboxProps) => {
    const [search, setSearch] = React.useState<string>("")
    const [filter, setFilter] = React.useState<string>('all')
    const [date, setDate] = React.useState<DateRange | undefined>(undefined)

    const detailLetter = (letter: Letter) => {
        // console.log(letter)
        router.get(route('letter.show', letter.id))
        return 'doing'
    }

    const filteredLetters = letters.filter(letter => {
        const receivedDate = letter.received_date ? new Date(letter.received_date) : null
        const sentDate = letter.created_at ? new Date(letter.created_at) : null

        if (filter == 'unread' && receivedDate != null) {
            return false
        }
        if (search) {
            const query = search.toLowerCase()
            if (
                !letter.letter_number.description.toLowerCase().includes(query) &&
                !letter.letter_number.code.toLowerCase().includes(query) &&
                !letter.sender.name.toLowerCase().includes(query)
            ) {
                return false;
            }
        }
        if (date && sentDate) {
            const { from, to } = date
            if (from && !to) {
                // return false
                // Only 'from' date is selected, filter letters for that specific day
                if (sentDate.toDateString() !== from.toDateString()) {
                    return false
                }
            } else if (from && to) {
                // Both 'from' and 'to' dates are selected, filter letters within the range
                if (sentDate <= from || sentDate >= to) {
                    return false
                }
            }
        }
        return true
    })

    const handleChangeDate = (selectedDate: DateRange | undefined) => {
        setDate(selectedDate)
        // console.log(filteredLetters)
    }

    return (
        <AuthenticatedLayout no_padding={false}
            header={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <Link href={route('dashboard')}>
                                Dashboard
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Surat Keluar</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            <Head title="Surat Keluar" />

            <div className="flex flex-col items-start justify-between gap-2 mb-3 md:flex-row">
                <Tabs defaultValue="all" className="" onValueChange={(value) => setFilter(value)}>
                    <TabsList>
                        <TabsTrigger value="all">Semua Surat</TabsTrigger>
                        <TabsTrigger value="unread">Belum Dibaca</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="w-full mb-2 bg-background/95">
                    <div className="flex flex-col items-center gap-2 md:justify-end md:flex-row">
                        <div className="relative w-full md:max-w-[300px]">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search" className="pl-8" onChange={(e) => setSearch(e.target.value)} />
                        </div>
                        <DatePickerWithRange
                            className="w-full md:w-[300px]"
                            initialRange={date}
                            onChange={handleChangeDate}
                        />
                    </div>
                </div>
            </div>
            {/* <Card className="">
                <CardContent className="p-3 border-t">
                    <Table>
                        <TableBody className="relative">
                            {filteredLetters.length ? filteredLetters.map((letter) => (
                                <TableRow key={letter.id} className="h-8" onClick={() => detailLetter(letter)}>
                                    <TableCell width={200}>
                                        {letter.sender.name}
                                    </TableCell>
                                    <TableCell>
                                        {letter.letter_number.code + " "}
                                        {letter.letter_number.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatGmailDate(letter.created_at)}
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center">Tidak ada surat</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card> */}
            <div className="space-y-2">
                {filteredLetters.length ? filteredLetters.map((letter) => (
                    <LetterCard
                        letter={letter}
                        handleClick={() => router.get(route('letter.sent.show', letter.id))}
                    />
                )) : (
                    <div className="w-full py-4 text-sm text-center">
                        ~ Surat tidak ditemukan ~
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    )
}

export default Sent
