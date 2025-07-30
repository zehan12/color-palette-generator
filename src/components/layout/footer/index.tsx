import React, { memo, useMemo } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from "@/app/favicon.ico";
import Image from 'next/image';

interface FooterProps {
    discover?: boolean;
}

export const Footer = memo(({ discover = false }: FooterProps) => {
    const currentYear = useMemo(() => new Date().getFullYear(), []);

    return (
        <footer className="sticky top-[100vh]">
            <section className="mx-7 my-10 md:mx-60 md:my-10 mb-10 md:mb-20">
                <div className='mx-auto grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-4'>
                    <div className="col-span-2 space-y-5 text-sm">
                        <div className='flex items-center gap-3'>
                            <Image src={Logo} alt="Piggment Logo" width={30} />
                            <h2 className='text-xl'>Colorify</h2>
                        </div>
                        <h6>
                            A curated collection of amazingly colored gradients for designers,
                            developers and art makers over the world.
                            <br />
                            <br />
                            Copyright © {currentYear}, Piggment.
                        </h6>
                    </div>
                    <div className='col-span-1 text-sm'>
                        <div className='flex flex-col items-start gap-3'>
                            <h5 className='text-sm font-semibold'>Colorify</h5>
                            <ul>
                                {
                                    ["Explore Gradients",
                                        "Gradient Palettes",
                                        "Generate Gradients",
                                        "Generate Palettes",
                                        "Contrast Checker",
                                        "Saved Gradients",
                                        "Install Chrome Extension"
                                    ].map((item) => (
                                        <li key={item} className='font-light py-2'>
                                            <Link href={"/" + item} >{item}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='col-span-1 text-sm'>
                        <div className='flex flex-col items-start gap-3'>
                            <h5 className='text-sm font-semibold'>Colorify</h5>
                            <ul>
                                {
                                    ["Explore Gradients",
                                        "Gradient Palettes",
                                        "Generate Gradients",
                                        "Generate Palettes",
                                        "Contrast Checker",
                                        "Saved Gradients",
                                        "Install Chrome Extension"
                                    ].map((item) => (
                                        <li key={item} className='font-light py-2'>
                                            <Link href={"/" + item} >{item}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='col-span-1 text-sm'>
                        <div className='flex flex-col items-start gap-3'>
                            <h5 className='text-sm font-semibold'>Colorify</h5>
                            <ul>
                                {
                                    ["Explore Gradients",
                                        "Gradient Palettes",
                                        "Generate Gradients",
                                        "Generate Palettes",
                                        "Contrast Checker",
                                        "Saved Gradients",
                                        "Install Chrome Extension"
                                    ].map((item) => (
                                        <li key={item} className='font-light py-2'>
                                            <Link href={"/" + item} >{item}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='col-span-1 text-sm'>
                        <div className='flex flex-col items-start gap-3'>
                            <h5 className='text-sm font-semibold'>Colorify</h5>
                            <ul>
                                {
                                    ["Explore Gradients",
                                        "Gradient Palettes",
                                        "Generate Gradients",
                                        "Generate Palettes",
                                        "Contrast Checker",
                                        "Saved Gradients",
                                        "Install Chrome Extension"
                                    ].map((item) => (
                                        <li key={item} className='font-light py-2'>
                                            <Link href={"/" + item} >{item}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-sm text-gray-500 text-center">
                        Created with <Heart className="inline h-3 w-3 text-red-500 fill-red-500" /> by Zehan Khan
                        <br />
                        <span className="text-xs">© {currentYear} Colorify</span>
                    </p>
                </div>
            </section>
        </footer >
    );
});

Footer.displayName = "Footer";