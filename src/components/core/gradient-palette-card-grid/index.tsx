import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { APPLICATION_ROUTES, LAYOUT_STATE_KEY, SEE_MORE_MODE } from "@/constants";
import { clearState, getState, setState } from "@/helpers";
import { cn } from "@/lib/utils";
import { GradientContext } from "@/providers/app-data-context-provider";
import { Gradient, Palette } from "@/types";
import { Circle, RefreshCcw, Square } from "lucide-react";
import Link from "next/link";
import { FC, use, useEffect, useState } from "react";

export interface GradientPaletteCardGridPropsType {
    title: string;
    mode: string;
    noRefresh: boolean;
    ispalette: boolean;
    items: Gradient[] | Palette[]
}

export const GradientPaletteCardGrid: FC<GradientPaletteCardGridPropsType> = (
    { title, mode, noRefresh, ispalette, items, }
) => {

    const [layout, setLayout] = useState(false);
    const { clearGradient } = use(GradientContext);

    useEffect(() => {
        if (getState(LAYOUT_STATE_KEY)) {
            setLayout(true);
        }
    }, []);

    const handleSaveState = () => {
        setState(LAYOUT_STATE_KEY, 1);
        setLayout(true);
    }

    const handleClearState = () => {
        clearState(LAYOUT_STATE_KEY);
        setLayout(false);
    }


    return (<>
        <section className="max-w-6xl px-10 mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">
                    {title} {" "}
                    {mode === SEE_MORE_MODE}
                    <Link href={APPLICATION_ROUTES.explore} className="ml-2 text-sm inline-block text-secondary-foreground hover:underline font-medium"
                    >
                        See All
                    </Link>
                </h2>
                <div className="flex justify-center gap-2 md:mb-0 mb-3">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={handleSaveState}
                                type="button"
                                className="mt-1"
                                aria-label="Save Square"
                            >
                                <Square
                                    size={19}
                                    className={cn(
                                        "cursor-pointer fill-accent text-accent",
                                        layout && "fill-primary text-primary"
                                    )}
                                />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Square Layout</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={handleClearState}
                                type="button"
                                className="mt-1"
                                aria-label="Save Circle"
                            >
                                <Circle size={20} className={cn("cursor-pointer fill-accent text-accent",
                                    !layout && "fill-primary text-primary")}
                                />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Circle Layout</p>
                        </TooltipContent>
                    </Tooltip>
                    {noRefresh && (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant={"link"}
                                    onClick={() => clearGradient()}
                                    type="button"
                                    aria-label="Refresh"
                                >
                                    <span aria-hidden="true" className="cursor-pointer flex items-center justify-center gap-1">
                                        <RefreshCcw focusable="false" className={cn(false && "animate-spin")} size={16} />
                                        Refresh
                                    </span>

                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Refresh</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                </div>
            </div>
            <div
                className="grid gap-x-10 gap-y-10"
                style={{
                    gridTemplateColumns: 'repeat(auto-fill, minmax(19em, 1fr))',
                    gridTemplateRows: '1fr',
                }}
            >
                {items && items.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </div>
        </section>
    </>)
}