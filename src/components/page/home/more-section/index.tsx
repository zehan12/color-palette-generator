import { ButtonSecondary } from "@/components/shared";
import { ButtonOutline } from "@/components/shared/buttons";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

export const MoreSection = memo(() => {
    return (
        <section className="min-h-[20rem] mt-24 px-4 md:px-8 mx-auto max-w-6xl flex items-center justify-center">
            <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-20 items-center w-full">
                {/* Text Section */}
                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-semibold">
                        Color inspiration & palette creation made easy
                    </h3>
                    <p className="mt-4 text-gray-600">
                        Colorify is the best way to browse, create and personalize gradient palettes.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mt-10">
                        <ButtonSecondary>
                            <Link href="/generate-palette" >
                                Start Generating
                            </Link>
                        </ButtonSecondary>
                        <ButtonOutline>
                            <Link href="/palette" passHref>
                                Explore Palettes
                            </Link>
                        </ButtonOutline>
                    </div>
                </div>

                {/* Image Section */}
                <div className="flex-1 w-full max-w-sm md:max-w-md">
                    <Image
                        width={400}
                        height={400}
                        className="rounded-lg object-cover w-full h-auto"
                        src="/lucyhale.jpg"
                        alt="Banner"
                    />
                </div>
            </div>
        </section>
    );
});

MoreSection.displayName = "MoreSection";
