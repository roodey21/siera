import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CheckLetter from "@/components/check-letter";
import { format, setDate } from 'date-fns';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { MultiSelector } from '@/components/ui/multiselector';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PageProps, User } from "@/types";
import { Classification, LetterNumber, LetterType } from "@/types/types";
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { CalendarIcon, Plus } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import FormCreate from '@/components/letter-number/form-create';
import { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import Memo from '@/components/document/memo';
import { MinimalTiptapEditor } from '@/components/minimal-tiptap';
import type { Content } from '@tiptap/react';

export default function Create({
    letterNumbers,
    users,
    classifications,
    letterTypes
}: PageProps<{
    letterNumbers: LetterNumber[],
    users: User[],
    classifications: Classification[],
    letterTypes: LetterType[]
}>) {
    const page = usePage()
    const form = useForm({
        letter_number_id: "",
        receiver: "",
        dispositions: [],
        date: "",
        subject: "",
        classification_code: "",
        attachment: null,
        summary: "",
        description: ""
    })
    const { errors } = usePage().props

    const [dialogFormIsOpen, setDialogFormIsOpen] = useState(false)
    const [isGenerateDocument, setIsGenerateDocument] = useState(false)
    const [letterNumber, setLetterNumber] = useState<LetterNumber | null>(null)
    const [receiver, setReceiver] = useState<User | null>(null)
    const [subject, setSubject] = useState<string>(form.data.subject)

    const handleSuccess = () => {
        setDialogFormIsOpen(false)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form.data);
        form.post(route('letter.compose.store'), {
            onSuccess: () => {
                form.reset()
                router.reload()
            }
        });
    }

    const dispositionOptions: Option[] = users.filter(
        (user) => user.id.toString() !== form.data.receiver
    ).map((user) => ({ label: user.name, value: user.id.toString() }))

    const handleSelectionChange = (selectedValues: any) => {
        form.setData('dispositions', selectedValues)
    }
    const handleReferenceNumberChange = (value: string) => {
        const selected = letterNumbers.find((letter) => letter.id.toString() === value);
        console.log(selected)
        if (selected) {
            const formattedDate = format(selected.date, 'yyyy-MM-dd')
            form.setData('date', formattedDate);
            form.setData('subject', selected.description);
        }

    }

    const handleInputSummary = (e: Content) => {
        if (e) {
            form.setData("summary", e.toString())
            console.log(e.toString())
        }
    }
    useEffect(() => {
        const selected = letterNumbers.find((letter) => letter.id.toString() === form.data.letter_number_id);
        const receiver = users.find((user) => user.id.toString() === form.data.receiver)
        const subject = setSubject(form.data.subject)
        setLetterNumber(selected || null);
        setReceiver(receiver || null)
    }, [form.data.letter_number_id, form.data.receiver, form.data.subject, letterNumbers]);

    return (
        <AuthenticatedLayout
            header={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href={route('dashboard')}>
                                Dashboard
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Tulis Surat</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            {/* <CheckLetter
                letterNumbers={letterNumbers}
            /> */}
            <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Tulis Surat</CardTitle>
                    <CardDescription>
                        Isi detail kelengkapan surat pada form berikut. Anda juga dapat menyesuaikan data nomor surat yang telah dipilih misal masih perlu adanya penyesuaian.
                    </CardDescription>
                </CardHeader>
                <CardContent className="">
                    <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-x-4 gap-y-5">
                        <div className="flex flex-col col-span-full md:col-span-2">
                            <Label>
                                Nomor Surat
                            </Label>
                            <div className="flex w-full">
                                <Select
                                    onValueChange={(value) => {
                                        form.setData('letter_number_id', value)
                                        handleReferenceNumberChange(value)
                                    }}
                                    value={form.data.letter_number_id}
                                    defaultValue={form.data.letter_number_id}
                                >
                                    <SelectTrigger className="flex-grow w-full min-w-0 rounded-r-none">
                                        <SelectValue placeholder="Pilih Nomor Surat" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {letterNumbers?.length ? letterNumbers.map((letterNumber) => (
                                            <SelectItem
                                                value={letterNumber.id.toString()}
                                                key={letterNumber.id}
                                            >
                                                {letterNumber.code}
                                            </SelectItem>
                                        )) : (
                                            <SelectItem
                                                value='""'
                                                disabled
                                            >Belum ada nomor surat</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                <Dialog
                                    open={dialogFormIsOpen} onOpenChange={setDialogFormIsOpen}
                                >
                                    <DialogTrigger asChild>
                                        <Button className="flex-shrink-0 border-l-0 rounded-l-none" variant="outline" size="icon">
                                            <Plus />
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
                            {errors.letter_number_id && (<p className="text-[0.8rem] font-medium text-destructive">{errors.letter_number_id}</p>)}
                        </div>
                        <div className="flex flex-col col-span-full md:col-span-2">
                            <Label>
                                Penerima
                            </Label>
                            <Select
                                onValueChange={(value) => form.setData('receiver', value)}
                                value={form.data.receiver}
                                defaultValue={form.data.receiver}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Penerima" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.length ? users.map((user) => (
                                        <SelectItem
                                            value={user.id.toString()}
                                            key={user.id}
                                        >
                                            {user.name}
                                        </SelectItem>
                                    )) : (
                                        <SelectItem value='""' disabled>No options listed</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.receiver && (<p className="text-[0.8rem] font-medium text-destructive">{errors.receiver}</p>)}
                        </div>
                        <div className="flex flex-col col-span-full md:col-span-2">
                            <Label>Disposisi</Label>
                            <MultiSelector
                                options={dispositionOptions}
                                placeholder="Pilih penerima disposisi"
                                emptyMessage="Tidak ada penerima"
                                onChange={handleSelectionChange}
                            />
                            {errors.disposition && (<p className="text-[0.8rem] font-medium text-destructive">{errors.disposition}</p>)}
                        </div>
                        {form.data.dispositions.length ? (
                            <div className="flex flex-col col-span-full">
                                <Label>Deskripsi disposisi</Label>
                                <Textarea
                                    value={form.data.description}
                                    onChange={(e) => form.setData('description', e.target.value)}
                                    placeholder="Deskripsi disposisi"
                                />
                            </div>
                        ) : null}
                        <div className="flex flex-col col-span-full md:col-span-2">
                            <Label>
                                Tanggal Surat
                            </Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full pl-3 text-left font-normal"
                                        )}
                                    >
                                        {form.data.date ? format(form.data.date, "yyy-MM-dd") : "Pilih tanggal"}
                                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode='single'
                                        selected={form.data.date ? new Date(form.data.date) : undefined}
                                        onSelect={(date) => {
                                            if (date) {
                                                const formattedDate = format(date, 'yyy-MM-dd')
                                                form.setData('date', formattedDate)
                                            }
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.date && (<p className="text-[0.8rem] font-medium text-destructive">{errors.date}</p>)}
                        </div>
                        <div className="flex flex-col col-span-full md:col-span-4">
                            <Label>
                                Perihal
                            </Label>
                            <Input
                                value={form.data.subject}
                                onChange={(e) => form.setData('subject', e.target.value)}
                                placeholder="Masukkan perihal surat"
                            />
                            {errors.subject && (<p className="text-[0.8rem] font-medium text-destructive">{errors.subject}</p>)}
                        </div>
                        <div className="flex flex-col col-span-full md:col-span-2">
                            <Label>
                                Kode Klasifikasi
                            </Label>
                            <Select
                                onValueChange={(value) => form.setData('classification_code', value)}
                                value={form.data.classification_code}
                                defaultValue={form.data.classification_code}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih klasifikasi surat" />
                                </SelectTrigger>
                                <SelectContent>
                                    {classifications.length ? classifications.map((classification) => (
                                        <SelectItem
                                            value={classification.code}
                                            key={classification.id}
                                        >
                                            {classification.type}
                                        </SelectItem>
                                    )) : (
                                        <SelectItem value='""' disabled>No options listed</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.classification_code && (<p className="text-[0.8rem] font-medium text-destructive">{errors.classification_code}</p>)}
                        </div>
                        <div className="flex flex-col col-span-full md:col-span-1">
                            <Label>
                                &nbsp;
                            </Label>
                            <div className="flex items-start self-center space-x-2 h-max col-span-full md:col-span-1">
                                <Switch id="airplane-mode" checked={isGenerateDocument} onCheckedChange={setIsGenerateDocument} />
                                <label className="text-sm font-medium" htmlFor="airplane-mode">Generate Dokumen</label>
                            </div>
                        </div>
                        {!isGenerateDocument && (
                            <div className="flex flex-col col-span-full md:col-span-3">
                                <Label>
                                    Lampiran
                                </Label>
                                <Input
                                    type='file'
                                    onChange={(e) => {
                                        const file = e.target.files ? e.target.files[0] : null;
                                        form.setData('attachment', file);
                                    }}
                                />
                                {errors.file && (<p className="text-[0.8rem] font-medium text-destructive">{errors.file}</p>)}
                            </div>
                        )}
                        <div className="flex flex-col col-span-full">
                            <Label>
                                Ringkasan
                            </Label>
                            <MinimalTiptapEditor
                                value={form.data.summary}
                                onChange={handleInputSummary}
                                className="w-full"
                                editorContentClassName="p-5"
                                output="html"
                                placeholder="Enter your description..."
                                autofocus={true}
                                editable={true}
                                editorClassName="focus:outline-none"
                            />
                            {/* <Textarea
                                value={form.data.summary}
                                onChange={(e) => form.setData('summary', e.target.value)}
                                placeholder="Masukkan ringkasan surat"
                            /> */}
                            {errors.summary && (<p className="text-[0.8rem] font-medium text-destructive">{errors.summary}</p>)}
                        </div>
                        <div className="flex items-center col-span-full">
                            <Button type="submit" disabled={form.processing} className="ml-auto">
                                {form.processing && (
                                    <div className="w-4 h-4 border-2 border-t-[#4b5563] mr-2 rounded-full animate-spin"></div>
                                )}
                                Submit
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
            {letterNumber && (
                <div className="w-full mt-6">
                    <Card>
                        <CardHeader/>
                        <CardContent>
                            {(letterNumber && isGenerateDocument) &&
                                <Memo
                                    letterNumber={letterNumber}
                                    sender={page.props.auth.user.name}
                                    receiver={receiver?.name}
                                    subject={subject}
                                />}
                        </CardContent>
                    </Card>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
