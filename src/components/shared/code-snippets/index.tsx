import React, { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import { rgbToHex } from "@/utils";
import { Gradient, Palette } from "@/types";

interface CodeSnippnetsProps {
    copyText: () => void;
    setViewCode: (view: boolean) => void;
    data: Gradient | Palette;
    isPalette?: boolean;
}

export const CodeSnippnets: React.FC<CodeSnippnetsProps> = ({
    copyText,
    setViewCode,
    data,
    isPalette = false,
}) => {
    const handleEscKey = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setViewCode(false);
            }
        },
        [setViewCode]
    );

    useEffect(() => {
        window.addEventListener("keydown", handleEscKey);
        return () => {
            window.removeEventListener("keydown", handleEscKey);
        };
    }, [handleEscKey]);

    return (
        <div
            className="fixed inset-0 bg-white/90 z-50 flex justify-center items-start pt-16 pointer-events-auto"
            style={{ maxHeight: "100vh", overflow: "overlay", padding: "24px" }}
        >
            <div className="w-full max-w-2xl bg-transparent fadeIn fade-in">
                <div className="relative bg-transparent">
                    {/* Close Button */}
                    <button
                        type="button"
                        aria-label="Close Code"
                        onClick={() => setViewCode(false)}
                        className="ml-auto block"
                    >
                        <X className="h-5 w-5 text-gray-800" aria-hidden="true" />
                    </button>

                    <h4 className="text-sm font-semibold text-gray-900 tracking-tight mb-4 mt-2">
                        CSS Code.
                    </h4>

                    <article className="text-left">
                        {!isPalette ? (
                            <>
                                <code className="text-xs text-gray-500 block mb-3">
                                    background: {rgbToHex((data as Gradient).color, 0)};
                                    <span className="text-gray-400">{" /* fallback for old browsers */"}</span>
                                </code>
                                <code className="text-xs text-gray-500 block mb-3">
                                    background: -webkit-{(data as Gradient).color};
                                    <span className="text-gray-400">{"/* Chrome 10-25, Safari 5.1-6 */"}</span>
                                </code>
                                <code className="text-xs text-gray-500 block mb-3">
                                    background: {(data as Gradient).color};
                                </code>
                            </>
                        ) : (
                            <>
                                <code className="text-xs text-gray-500 block mb-3">
                                    background: {(data as Palette).colors?.[0]};
                                    <span className="text-gray-400">{"/* fallback for old browsers */"}</span>
                                </code>
                                <code className="text-xs text-gray-500 block mb-3">
                                    <span className="text-gray-400">{"/* CSS Tokens */"}</span>
                                    {(data as Palette).colors?.map((color: string, index: number) => (
                                        <div key={index + Math.random()}>
                                            --color{index + 1}: {color};
                                        </div>
                                    ))}
                                </code>
                            </>
                        )}
                    </article>

                    <Button
                        size="sm"
                        variant="default"
                        onClick={copyText}
                        className="mt-2 text-xs py-1 px-3 bg-gray-900 hover:bg-gray-800 text-white"
                    >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy To Clipboard
                    </Button>
                </div>
            </div>
        </div>
    );
};

