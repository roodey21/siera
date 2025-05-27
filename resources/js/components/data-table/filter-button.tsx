import * as React from "react";
// import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusCircleIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

type Option = {
  value: string;
  label: string;
};

type FilterButtonProps = {
  updateFilter: (filter: string[]) => void;
  options: Option[];
  label: string;
};

export const FilterButton = ({
  updateFilter,
  options,
  label,
}: FilterButtonProps) => {
  const [selectedValues, setSelectedValues] = React.useState<Set<string>>(
    new Set()
  );

  const handleClearFilters = () => {
    setSelectedValues(new Set());
    updateFilter([]);
  };

  const handleOptionSelect = (option: Option) => {
    const newSelectedValues = new Set(selectedValues);

    if (newSelectedValues.has(option.value)) {
      newSelectedValues.delete(option.value);
    } else {
      newSelectedValues.add(option.value);
    }

    setSelectedValues(newSelectedValues);
    updateFilter(Array.from(newSelectedValues));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 border-dashed">
          <PlusCircleIcon className="mr-2 size-4" />
          {label}{" "}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12.5rem] p-0" align="start">
        <Command>
          <CommandInput placeholder="Filter options" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <CommandItem
                    key={option.label}
                    onSelect={() => handleOptionSelect(option)}
                  >
                    <div
                      className={cn(
                        "mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="size-4" aria-hidden="true" />
                    </div>
                    <span>
                      {option.label}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
            <>
              <CommandSeparator />
              <CommandGroup>
                <CommandItem
                  className="justify-center text-center"
                  onSelect={handleClearFilters}
                >
                  Clear filters
                </CommandItem>
              </CommandGroup>
            </>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
