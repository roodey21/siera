import { ChatBox } from "@/components/chat-box";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ButtonWithTooltip } from "@/components/ui/button-with-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { formatGmailDate } from "@/helpers/formatDate";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Letter } from "@/types/types";
import { Head, Link, router } from "@inertiajs/react";
import { format } from "date-fns";
import { ArrowLeft, FileSymlink, Menu, MoreHorizontal, Pencil, SendHorizonal, Trash2 } from "lucide-react";
import React from "react";

export default function Show({ letter }: { letter: Letter }) {
    const [comments, setComments] = React.useState(letter.comments)
    const sendComment = (message: string, reset: () => void) => {
        router.post(route('letter.sent.comment.store', letter.id), { body: message }, {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                router.reload()
            }
        })
    }

    return (
        <AuthenticatedLayout
            header={
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                            <Link href={route('dashboard')}>
                                Dashboard
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem className="hidden md:block">
                            <Link href={route('letter.inbox')}>
                                Surat Keluar
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{letter.letter_number.code}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            }
        >
            <Head title={letter.letter_number.code} />

            <div className="flex justify-between mb-4">
                <Button variant="outline" asChild>
                    <Link href={route('letter.inbox')}>
                        <ArrowLeft />
                        Kembali
                    </Link>
                </Button>
                <div className="flex flex-row gap-1">
                    <Button variant="default">
                        <FileSymlink />Disposisi
                    </Button>
                    <ButtonWithTooltip tooltip="Edit" size="icon" variant="warning" onClick={() => router.get(route('letter.sent.edit', letter.id))}>
                        <Pencil />
                    </ButtonWithTooltip>
                    <ButtonWithTooltip tooltip="Hapus" size="icon" variant="destructive">
                        <Trash2 />
                    </ButtonWithTooltip>
                    {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="default">
                                <Menu/> Menu
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                </div>
            </div>
            <div className="mx-auto mb-4">
                <Card>
                    <CardHeader>
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col gap-2">
                                <div className="text-lg font-semibold">
                                    {letter.letter_number.code}
                                </div>
                                <span className="text-sm font-medium">Pengirim : {letter.sender.name}</span>
                            </div>
                            <div className="flex flex-col gap-2 text-end">
                                <div className="text-base font-semibold">Tanggal Surat</div>
                                <span className="text-sm font-medium">{formatGmailDate(letter.date)}</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="letter-number-subject">
                            Perihal : <span>{letter.letter_number.description}</span>
                        </div>
                        <div className="summary">
                            <p>{letter.summary}</p>
                        </div>
                        <div className="flex items-center gap-2 my-4">
                            <Separator className="flex-1" />
                            <span className="text-sm text-muted-foreground">Detail Surat</span>
                            <Separator className="flex-1" />
                        </div>
                        <dl className="grid grid-cols-[180px_1fr] gap-y-2 text-sm">
                            <dt className="font-semibold text-gray-600">Tanggal Surat</dt>
                            <dd className="text-gray-800">{formatGmailDate(letter.created_at)}</dd>

                            <dt className="font-semibold text-gray-600">Tanggal Diterima</dt>
                            <dd className="text-gray-800">{letter.received_date ? formatGmailDate(letter.received_date) : '-'}</dd>

                            <dt className="font-semibold text-gray-600">Nomor Surat</dt>
                            <dd className="text-gray-800">{letter.letter_number.code}</dd>

                            <dt className="font-semibold text-gray-600">Kode</dt>
                            <dd className="text-gray-800">{letter.classification.code}</dd>

                            <dt className="font-semibold text-gray-600">Klasifikasi</dt>
                            <dd className="text-gray-800">{letter.classification.description}</dd>

                            <dt className="font-semibold text-gray-600">Penerima</dt>
                            <dd className="text-gray-800">{letter.receiver.name}</dd>

                            <dt className="font-semibold text-gray-600">Dibuat oleh</dt>
                            <dd className="text-gray-800">{letter.sender.name}</dd>

                            <dt className="font-semibold text-gray-600">Dibuat pada</dt>
                            <dd className="text-gray-800">{formatGmailDate(letter.created_at)}</dd>

                            <dt className="font-semibold text-gray-600">Diperbarui pada</dt>
                            <dd className="text-gray-800">{formatGmailDate(letter.updated_at)}</dd>
                        </dl>
                    </CardContent>
                </Card>
            </div>
            <ChatBox
                title="Follow up"
                comments={letter.comments}
                handleSubmit={sendComment}
            />
        </AuthenticatedLayout>
    )
}
