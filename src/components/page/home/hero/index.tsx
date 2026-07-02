import { ButtonSecondary } from "@/components/shared"
import { ButtonOutline } from "@/components/shared/buttons"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { memo } from "react"

export const Hero = memo(() => {
    return (
        <section className="
            flex justify-center items-center 
            mb-16 min-h-[40em] -z-10
            bg-[#F7E7FF] 
            clip-polygon-header 
            text-center
            w-full
            overflow-hidden
        ">
            <div className="container px-4 sm:px-6">
                <div className="flex items-center justify-center w-full">
                    <div className="my-10 w-full max-w-4xl">
                        <article className="flex flex-col items-center justify-center">
                            <h1 className="
                                font-semibold text-4xl sm:text-5xl md:text-7xl 
                                text-black/80 tracking-[-1px] md:tracking-[-2.8px]
                                leading-[1.2] md:leading-[1.04] 
                                mx-0 my-[0.35em]
                            ">
                                Find your perfect <br />
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                    gradient
                                </span> match
                            </h1>

                            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
                                Find the best color gradient and palettes for your next
                                design project.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 mb-6 w-full">
                                <ButtonSecondary>
                                    <Link href="/generate" className="cursor-pointer">
                                        Start Generating
                                    </Link>
                                </ButtonSecondary>

                                <ButtonOutline>
                                    <Link href="/explore" className="cursor-pointer">
                                        Explore Gradients
                                    </Link>
                                </ButtonOutline>
                            </div>

                            <p className="mt-3 text-sm md:text-base">
                                You can be colorful too! Join over {' '}
                                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
                                    1000
                                </span> active creators.
                            </p>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    )
})

Hero.displayName = "Hero";