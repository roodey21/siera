import Memo from "@/components/document/memo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { LetterNumber } from "@/types/types"
import { useForm } from "@inertiajs/react"
import React from "react"

export default function GenerateDocument({ letterNumbers }: { letterNumbers: LetterNumber[] }) {
    const [letterNumber, setLetterNumber] = React.useState<LetterNumber | null>(null)

    const form = useForm({
        letter_number_id: "",
        document_type: ""
    })

    const handleGenerateDocument = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // if (!form.data.letter_number_id) {
        //     console.warn("Nomor surat belum dipilih");
        //     return;
        // }
        const selectedLetterNumber = letterNumbers.find((item) => item.id.toString() === form.data?.letter_number_id.toString()) || null
        setLetterNumber(selectedLetterNumber)
    }

    return (
        <AuthenticatedLayout>
            <div className="max-w-xl">
                <Card>
                    <CardHeader>
                        <CardTitle>Pilih Nomor Surat</CardTitle>
                        <CardDescription>
                            Pilih nomor surat yang akan digunakan untuk membuat dokumen surat.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleGenerateDocument} className="space-y-5">
                            <div className="form-group">
                                <Label>Nomor Surat</Label>
                                <Select
                                    onValueChange={(value) => {
                                        form.setData('letter_number_id', value)
                                    }}
                                    value={form.data.letter_number_id}
                                    defaultValue={form.data.letter_number_id}
                                >
                                    <SelectTrigger className="flex-grow w-full min-w-0">
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
                            </div>
                            <div className="form-group">
                                <Label>Jenis Dokumen</Label>
                                <Select
                                    onValueChange={(value) => {
                                        form.setData('document_type', value)
                                    }}
                                    value={form.data.document_type}
                                    defaultValue={form.data.document_type}
                                >
                                    <SelectTrigger className="flex-grow w-full min-w-0">
                                        <SelectValue placeholder="Pilih Jenis Dokumen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem
                                            value="memo"
                                            key="memo"
                                        >
                                            Memo
                                        </SelectItem>
                                        <SelectItem
                                            value="memo2"
                                            key="memo2"
                                        >
                                            Memo
                                        </SelectItem>
                                        <SelectItem
                                            value="memo3"
                                            key="memo3"
                                        >
                                            Memo
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-end">
                                <Button>Generate</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
            {/* tampilkan letter number disini dan pass letternumber ke component memo */}
            {letterNumber && (
                <div className="w-full mt-6">
                    <Card>
                        <CardHeader/>
                        <CardContent>
                            {/* {letterNumber && <Memo letterNumber={letterNumber} />} */}
                        </CardContent>
                    </Card>
                </div>
            )}
        </AuthenticatedLayout>
    )
}
