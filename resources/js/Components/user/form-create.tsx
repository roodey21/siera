import { route } from "ziggy-js";
import { PageProps } from "@/types";
import { Department, LetterType, User } from "@/types/types";
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
import React from "react";
import { Switch } from "../ui/switch";

interface FormCreateProps {
    onSuccess: () => void
    departments?: Department[]
}

export default function FormCreate({ onSuccess, departments }: FormCreateProps) {
    const { errors } = usePage<PageProps>().props

    const { data, setData, post, processing } = useForm({
        name: "",
        email: "",
        phone: "",
        role: "",
        department_id: "",
        status: "active"
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        // Add your update logic here
        post(route('users.store'))
        onSuccess()
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col">
                <Label>Nama</Label>
                <Input
                    placeholder="Nama Lengkap"
                    defaultValue={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && (<p className="text-[0.8rem] font-medium text-destructive">{errors.name}</p>)}
            </div>
            <div className="flex flex-col">
                <Label>Email</Label>
                <Input
                    placeholder="Email"
                    defaultValue={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && (<p className="text-[0.8rem] font-medium text-destructive">{errors.email}</p>)}
            </div>
            <div className="flex flex-col">
                <Label>Nomor Telepon</Label>
                <Input
                    placeholder="Nomor Telepon"
                    defaultValue={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                />
                {errors.phone && (<p className="text-[0.8rem] font-medium text-destructive">{errors.phone}</p>)}
            </div>
            {/* <div className="flex flex-col">
                <Label>Peran</Label>
                <Select onValueChange={(value) => setData('role', value)}>
                    <SelectTrigger className="flex-grow w-full min-w-0">
                        <SelectValue placeholder="Pilih Peran" />
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
                {errors.role && (<p className="text-[0.8rem] font-medium text-destructive">{errors.role}</p>)}
            </div> */}
            <div className="flex flex-col">
                <Label>Departemen</Label>
                <Select onValueChange={(value) => setData('department_id', value)}>
                    <SelectTrigger className="flex-grow w-full min-w-0">
                        <SelectValue placeholder="Pilih Departemen" />
                    </SelectTrigger>
                    <SelectContent>
                        {departments?.length ? departments.map((department) => (
                            <SelectItem
                                value={department.id.toString()}
                                key={department.id}
                            >
                                {department.name}
                            </SelectItem>
                        )) : (
                            <SelectItem value='""' disabled>No options listed</SelectItem>
                        )}
                    </SelectContent>
                </Select>
                {errors.role && (<p className="text-[0.8rem] font-medium text-destructive">{errors.role}</p>)}
            </div>
            <div className="flex items-start self-center space-x-2 h-max col-span-full md:col-span-1">
                <Switch id="airplane-mode" checked={data.status === "active"}
                    onCheckedChange={() => {
                        data.status === 'active' ? setData("status", "inactive") : setData("status", "active")
                    }}
                />
                <label className="text-sm font-medium" htmlFor="airplane-mode">Aktif</label>
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
    )
}
