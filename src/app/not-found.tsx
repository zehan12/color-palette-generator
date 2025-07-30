"use client";

import Link from "next/link";
import { useCallback, useState } from "react";

export default function NotFound() {
    const [image, setImage] = useState("/images/error/error-main.jpg");

    const handleChangeImageOnHover = useCallback((idx: number) => {
        if (idx === 0) setImage("/images/error/error-one.jpg");
        else if (idx === 1) setImage("/images/error/error-two.jpg");
        else if (idx === 2) setImage("/images/error/error-three.jpg");
    }, []);

    const handleChangeImageOnMouseOut = () => {
        setImage("/images/error/error-main.jpg");
    };

    return (
        <section className="flex items-center justify-center min-h-screen mt-10 px-4">
            <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10">
                {/* Left Side */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
                    <div className="flex items-center justify-center gap-2 cursor-pointer">
                        {["4", "0", "4"].map((digit, idx) => (
                            <span
                                key={idx}
                                className="text-[96px] sm:text-[120px] md:text-[140px] lg:text-[160px] font-extrabold text-gray-300 select-none hover:text-accent-foreground transition duration-700"
                                onMouseEnter={() => handleChangeImageOnHover(idx)}
                                onMouseLeave={handleChangeImageOnMouseOut}
                            >
                                {digit}
                            </span>
                        ))}
                    </div>
                    <p className="md:-mt-10 mt-0 font-bold text-2xl">Ouch! Page Not Found</p>

                    {/* Message */}
                    <div className="max-w-sm text-center mt-6 px-4">
                        <p className="text-accent-foreground font-semibold">
                            The page you are looking for was moved, removed, renamed or might never have existed.
                        </p>
                        <Link
                            href="/"
                            className="inline-block mt-6 text-blue-500 hover:underline font-medium"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>

                {/* Right Side (Image) */}
                <div className="w-full md:w-1/2">
                    <div className="relative h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-4xl">
                        <img
                            key={image}
                            src={image}
                            alt="error-image"
                            className="object-cover scale-150 w-full h-full transition-transform duration-300 mt-20"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
