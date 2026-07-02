"use client";
import { GradientPaletteCardGrid } from "@/components/core";
import { ButtonSecondary } from "@/components/shared"
import { SmallCard } from "@/components/shared/card/small-card";
import { SEE_MORE_MODE } from "@/constants";
import { GradientContext } from "@/providers/app-data-context-provider";
import Link from "next/link"
import { memo, use, useEffect } from "react"

export const ExploreGradients = memo(() => {

    const { gradient, loadGradients } = use(GradientContext);

    useEffect(() => {
        if (gradient.length < 7) {
            loadGradients(7);
        }
    }, [gradient.length, loadGradients,]);

    return (<>
        <section>
            <div className="container">
                <GradientPaletteCardGrid
                    title="Explore gradients."
                    items={gradient.slice(0, -1)}
                    noRefresh
                    ispalette={false}
                    mode={SEE_MORE_MODE}
                />

                <div className="m-auto text-center">
                    <p className="text-zinc-900/70">Need more gradients?</p>
                    <ButtonSecondary className="my-5 !w-60">
                        <Link href="/explore">
                            See All Gradients
                        </Link>
                    </ButtonSecondary>
                </div>
            </div>
        </section>
    </>)
})

ExploreGradients.displayName = "ExploreGradients";