"use client"

import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import "react-day-picker/dist/style.css"

import { cn } from "@/lib/utils"
import { Button } from "@/app/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover"

interface CalendarProps {
  mode?: "single" | "multiple" | "range"
  selected?: Date | null
  onSelect: (date: Date | undefined) => void
  disabled?: Date | Date[] | undefined
  className?: string
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  disabled,
  className,
}: CalendarProps) {
  const formatSelectedDate = (date: Date | null | undefined): string => {
    if (!date) return ""
    return format(date, "PPP")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !selected && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? formatSelectedDate(selected) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <DayPicker
          mode="single"
          selected={selected || undefined}
          onSelect={(date) => onSelect(date || undefined)}
          disabled={disabled}
          className="rounded-md border"
        />
      </PopoverContent>
    </Popover>
  )
}

Calendar.displayName = "Calendar"

interface CalendarProps {
  mode?: "single" | "multiple" | "range"
  selected?: Date | Date[] | { from: Date; to: Date } | null
  onSelect: (date: Date | Date[] | { from: Date; to: Date } | undefined) => void
  disabled?: Date | Date[] | Date[] | undefined
  className?: string
}
