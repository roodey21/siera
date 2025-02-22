import { route } from "ziggy-js";
import { PageProps } from "@/types";
import { LetterType } from "@/types/types";
import { router, useForm, usePage } from "@inertiajs/react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { useToast } from "@/hooks/use-toast";

export default function FormCreate({
    letterTypes,
    handleSuccess
}: {
    letterTypes: LetterType[],
    handleSuccess: () => void
}) {
    const { errors } = usePage<PageProps>().props;
    const { toast } = useToast();
    const { data, setData, post, processing } = useForm({
        letter_type_id: "",
        pic: "",
        date: "",
        description: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('letter-number.store'), {
            onSuccess: () => {
                handleSuccess()
            },
            onError: () => {
                console.error('ada error nih guys')
            }
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col">
                <Label>Tipe</Label>
                <Select onValueChange={(value) => setData('letter_type_id', value)}>
                    <SelectTrigger className="flex-grow w-full min-w-0 rounded-r-none">
                        <SelectValue placeholder="Pilih Tipe Surat" />
                    </SelectTrigger>
                    <SelectContent>
                        {letterTypes.length ? letterTypes.map((letterType) => (
                            <SelectItem
                                value={letterType.id.toString()}
                                key={letterType.id}
                            >
                                {letterType.name}
                            </SelectItem>
                        )) : (
                            <SelectItem value='""' disabled>No options listed</SelectItem>
                        )}
                    </SelectContent>
                </Select>
                {errors.letter_type_id && (<p className="text-[0.8rem] font-medium text-destructive">{errors.letter_type_id}</p>)}
            </div>
            <div className="flex flex-col">
                <Label>PIC</Label>
                <Input
                    placeholder="Penanggung Jawab"
                    onChange={(e) => setData('pic', e.target.value)}
                />
                {errors.pic && (<p className="text-[0.8rem] font-medium text-destructive">{errors.pic}</p>)}
            </div>
            <div className="flex flex-col">
                <Label>Tanggal</Label>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn("w-full pl-3 text-left font-normal")}
                        >
                            {data.date ? format(data.date, "yyyy-MM-dd") : "Pilih tanggal"}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={data.date ? new Date(data.date) : undefined}
                            onSelect={(date) => {
                                if (date) {
                                    const formattedDate = format(date, 'yyyy-MM-dd')
                                    setData('date', formattedDate)
                                }
                            }}
                        />
                    </PopoverContent>
                </Popover>
                {errors.date && (<p className="text-[0.8rem] font-medium text-destructive">{errors.date}</p>)}
            </div>
            <div className="flex flex-col">
                <Label className="mb-2">Perihal</Label>
                <Input
                    placeholder="Perihal"
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && (<p className="text-[0.8rem] font-medium text-destructive">{errors.description}</p>)}
            </div>
            <div className="flex">
                <Button onClick={handleSubmit} disabled={processing} className="ml-auto">
                    {processing && (
                        <div className="w-4 h-4 mr-2 border-2 rounded-full border-t-gray-500 animate-spin"></div>
                    )}
                    Submit
                </Button>
            </div>
        </div>
    );
}
