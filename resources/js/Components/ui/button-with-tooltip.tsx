import { ReactNode } from "react";
import { Button, ButtonProps } from "./button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface TooltipButtonProps extends ButtonProps {
    children: ReactNode,
    tooltip: string
}

export function ButtonWithTooltip({ children, tooltip, ...props }: TooltipButtonProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button {...props}>{children}</Button>
                </TooltipTrigger>
                <TooltipContent>{tooltip}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}



