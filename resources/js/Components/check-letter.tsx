import { LetterNumber } from "@/types/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useState } from "react";

type CheckLetterProps = {
    letterNumbers: LetterNumber[];
}

export default function CheckLetter({ letterNumbers }: CheckLetterProps ) {
    const [letterNumber, setLetterNumber] = useState<LetterNumber | null>(null);

    return (
        <Card className="">
            <CardHeader>
                <CardTitle>
                    Cek Nomor Surat
                </CardTitle>
                <CardDescription>
                    Pilih untuk cek informasi nomor surat atau buat nomor surat baru
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full">
                    <div className="col-span-2 grid w-full items-center gap-1.5">
                        <Select
                            onValueChange={(value) => {
                                const selected = letterNumbers.find(letter => letter.id.toString() === value);
                                if (selected) {
                                    setLetterNumber(selected)
                                }
                                console.log(selected)
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih Nomor Surat" />
                            </SelectTrigger>
                            <SelectContent>
                                {letterNumbers.map((letterNumber, index) => (
                                    <SelectItem key={index} value={letterNumber.id.toString()}>{letterNumber.code}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}
