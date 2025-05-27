import * as React from "react"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"

export function DatePickerWithRange({
  className,
  initialRange,
  onChange
}: {
  className?: string,
  initialRange?: DateRange,
  onChange?: (selectedDate: DateRange | undefined) => void
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(initialRange)

  const handleSelect = (selectedDate: DateRange | undefined) => {
    // console.log(selectedDate)
    setDate(selectedDate)
    if(onChange) {
        onChange(selectedDate)
    }
  }

  const handleClear = () => {
    setDate(undefined)
    if(onChange) {
        onChange(undefined)
    }
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "md:max-w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
          <div className="flex items-center justify-between p-2 px-4">
            <div className="text-sm capitalize text-primary"> pilih 2 rentang tanggal </div>
            <Button variant="outline" size="sm"
                onClick={handleClear}
            >Clear</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
