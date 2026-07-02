import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { memo, ReactNode } from "react"

export const ButtonSecondary = memo(({ className, children }: { className?: string, children: ReactNode }) => {
    return (<>
        <Button
            asChild
            variant="default"
            size="lg"
            className={cn("bg-secondary-foreground/90 w-full sm:w-auto py-6 px-8 sm:px-14",
                "hover:bg-secondary-foreground hover:shadow-[6px_8px_13px_#0000006b]  transition-shadow duration-300cursor-pointer",
                className
            )}
        >
            {children}
        </Button>
    </>)
})

ButtonSecondary.displayName = "ButtonSecondary";

export const ButtonOutline = memo(({ className, children }: { className?: string, children: ReactNode }) => {
    return (<>
        <Button
            asChild
            variant="outline"
            size="lg"
            className={cn("w-full sm:w-auto py-6 px-8 sm:px-14",
                "border-secondary-foreground text-secondary-foreground/90",
                "hover:bg-white/40 hover:text-secondary-foreground",
                "hover:shadow-[6px_8px_13px_#0000006b]",
                "transition-shadow duration-300 cursor-pointer",
                className
            )}
        >
            {children}
        </Button >
    </>)
})

ButtonOutline.displayName = "ButtonOutline";