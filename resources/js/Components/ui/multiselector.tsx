"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

/**
 * Reusable MultiSelector component.
 *
 * @param {Object} props - Component props
 * @param {Array<{ value: string, label: string }>} props.options - The options to display in the selector.
 * @param {string} props.placeholder - The placeholder text when no option is selected.
 * @param {string} props.emptyMessage - The message to display when no options match the search.
 * @param {Array<string>} props.defaultValue - The default selected values.
 * @param {function(Array<string>): void} props.onChange - Callback function when the selected value changes.
 */
export function MultiSelector({
    options = [],
    placeholder = "Select items...",
    emptyMessage = "No items found.",
    defaultValue = [],
    onChange,
    disabled = false
}: {
    options: { value: string; label: string }[]
    placeholder?: string
    emptyMessage?: string
    defaultValue?: string[]
    onChange?: (value: string[]) => void
    disabled?: boolean
}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState<string[]>(defaultValue)

    const handleSetValue = (val: string) => {
        const newValue = value.includes(val)
            ? value.filter((item) => item !== val)
            : [...value, val]

        setValue(newValue)
        onChange?.(newValue) // Call the onChange callback if provided
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between w-full"
                >
                    <div className="flex justify-start gap-2 overflow-x-scroll no-scrollbar">
                        {value?.length ?
                            value.map((val, i) => (
                                <div
                                    key={i}
                                    className="px-2 py-1 text-xs font-medium border rounded-xl bg-slate-200"
                                >
                                    {options.find((option) => option.value === val)?.label}
                                </div>
                            ))
                            : placeholder}
                    </div>
                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder="Search..."
                        className="border-0 focus-visible:ring-0 focus-within:border-0"
                    />
                    <CommandEmpty>{emptyMessage}</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {options.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={() => {
                                        handleSetValue(option.value)
                                    }}
                                    disabled={disabled}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value.includes(option.value) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
