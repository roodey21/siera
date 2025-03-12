import * as React from "react"
import { Letter } from "@/types/types"
import { Card, CardContent } from "../ui/card"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreVertical } from "lucide-react"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { Textarea } from "../ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { useForm } from "react-hook-form"

type LetterDetailProps = {
    selectedLetter: Letter
    dropdown: boolean
    onSuccessDelete?: () => void
    onSuccessArchive?: () => void
}

const LetterDetail = ({ selectedLetter, dropdown, onSuccessDelete, onSuccessArchive }: LetterDetailProps) => {

    const [isDialogDeleteOpen, setIsDialogDeleteOpen] = React.useState(false)
    const [deleteLetter, setDeleteLetter] = React.useState<Letter | null>(null)

    const { handleSubmit, formState } = useForm()

    return (
        <div className="col-span-full">
            <div className="sticky mr-4 space-y-4">
                <Card>
                    <CardContent className="pt-4">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-base font-medium">{selectedLetter.letter_number.code}</h2>
                                <p className={cn(!selectedLetter.sender && "italic", "text-muted-foreground text-sm")}>{selectedLetter.sender ? selectedLetter.sender.name : 'User Deleted'}</p>
                            </div>
                            <div>
                                {dropdown && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" disabled={!selectedLetter}>
                                                <MoreVertical className="w-4 h-4" />
                                                <span className="sr-only">More</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                            {/* <DropdownMenuItem onClick={() => { handleClickArchive(selectedLetter) }}>Arsipkan</DropdownMenuItem>
                                            <DropdownMenuItem onClick={handleClickDelete(selectedLetter)}>Pindahkan ke sampah</DropdownMenuItem> */}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="text-sm">
                            <div className="mb-2">Perihal : <span className="font-medium">{selectedLetter.letter_number.description}</span></div>
                            <p>{selectedLetter.summary}</p>
                        </div>
                        <Separator className="my-4" />
                        <dl className="mt-3 space-y-2 text-sm">
                            <div className="grid justify-between">
                                <dt className="font-medium text-muted-foreground">Tanggal Surat</dt>
                                <dd className="">{selectedLetter.letter_number.date}</dd>
                            </div>

                            <div className="grid justify-between">
                                <dt className="font-medium text-muted-foreground">Tanggal Diterima</dt>
                                <dd className="">{selectedLetter.letter_number.updated_at}</dd>
                            </div>

                            <div className="grid justify-between">
                                <dt className="font-medium text-muted-foreground">Nomor Surat</dt>
                                <dd className="">{selectedLetter.letter_number.code}</dd>
                            </div>

                            <div className="grid justify-between">
                                <dt className="font-medium text-muted-foreground">Kode</dt>
                                <dd className="">{selectedLetter.classification.code}</dd>
                            </div>

                            <div className="grid justify-between">
                                <dt className="font-medium text-muted-foreground">Klasifikasi</dt>
                                <dd className=""><Badge>{selectedLetter.classification.type}</Badge></dd>
                            </div>

                            <div className="grid justify-between">
                                <dt className="font-medium text-muted-foreground">Penerima</dt>
                                <dd className={cn(!selectedLetter.receiver && "italic")}>{selectedLetter.receiver ? selectedLetter.receiver.name : 'User Deleted'}</dd>
                            </div>

                            <div className="grid justify-between">
                                <dt className="font-medium text-muted-foreground">Dibuat oleh</dt>
                                <dd className={cn(!selectedLetter.sender && "italic")}>{selectedLetter.sender ? selectedLetter.sender.name : 'User Deleted'}</dd>
                            </div>

                            <div className="grid justify-between">
                                <dt className="font-medium text-muted-foreground">Dibuat pada</dt>
                                <dd className="">{selectedLetter.created_at}</dd>
                            </div>

                            <div className="grid justify-between">
                                <dt className="font-medium text-muted-foreground">Diperbarui pada</dt>
                                <dd className="">{selectedLetter.updated_at}</dd>
                            </div>
                        </dl>
                    </CardContent>
                </Card>
                <Card className="p-0 overflow-hidden">
                    <CardContent className="p-2">
                        <h3>Komentar</h3>
                        <div className="w-full py-3">
                            list koment
                        </div>
                        <div className="w-full">
                            <form>
                                <div className="grid gap-4">
                                    <Textarea
                                        className="p-4"
                                        placeholder={`Reply ...`}
                                    />
                                    <div className="flex items-center">
                                        <Button
                                            onClick={(e) => e.preventDefault()}
                                            size="sm"
                                            className="ml-auto"
                                        >
                                            Send
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </CardContent>
                </Card>
            </div>
            {/* <Dialog open={isDialogDeleteOpen} onOpenChange={setIsDialogDeleteOpen}>
                <DialogContent>
                    <form onSubmit={handleSubmit(handleDelete)}>
                        <DialogHeader>
                            <DialogTitle>Konfirmasi Hapus</DialogTitle>
                            <DialogDescription>
                                Apakah anda yakin ingin memindahkan surat ini ke sampah ? <br />
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="mt-4">
                            <Button variant="ghost" type="reset" onClick={() => setIsDialogDeleteOpen(false)}>Cancel</Button>
                            <Button variant="destructive" type="submit" disabled={formState.isSubmitting}>
                                {formState.isSubmitting && (<div className="w-4 h-4 border-2 border-t-[#4b5563] mr-2 rounded-full animate-spin"></div>)}
                                Delete
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog> */}
        </div>
    )
}

export default LetterDetail
