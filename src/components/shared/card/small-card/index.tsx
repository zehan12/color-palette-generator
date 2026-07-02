/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useState, memo } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { Heart, Code, Download, Trash2 } from 'lucide-react';
import { rgbToHex } from '@/utils';
import { Gradient } from '@/types';

/* --------------------------- Prop Types (TS) -------------------------- */
interface SmallCardProps {
    children?: React.ReactNode;
    data: Gradient
    loved?: boolean;
    saveGradient: (gradient: Gradient) => void;
    deleteGradient?: (gradient: Gradient) => void;
    url: string;
    layout?: string;
    mode?: 'save' | 'delete';
}

export const SmallCard = memo(
    ({
        children,
        data,
        loved = false,
        saveGradient,
        deleteGradient,
        url,
        layout,
        mode,
    }: SmallCardProps) => {
        const [viewCode, setViewCode] = useState(false);
        const [show, setShow] = useState(false);

        const colorOne = rgbToHex(data.color, 1);
        const colorTwo = rgbToHex(data.color, 0);

        const handleDelete = () => {
            deleteGradient?.(data);
        };

        return (
            <>
                {/* Main Card */}
                <div
                    className={`
            relative mx-auto w-full max-w-xs overflow-hidden
            rounded-lg border border-transparent bg-white
            shadow-sm transition-all duration-300 ease-in-out
            hover:-mt-2 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent
            ${layout === 'circle' ? 'flex flex-col items-center' : ''}
          `}
                    style={{ boxShadow: '0 2px 15px #0d14420d' }}
                    onClick={() => setShow(true)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => ['Enter', ' '].includes(e.key) && setShow(true)}
                >
                    {children}

                    {/* Gradient Figure */}
                    <figure
                        className={`
              relative mx-auto h-52 w-full overflow-hidden
              transition-all duration-500 ease-in-out
              ${layout === 'circle'
                                ? 'h-56 w-56 rounded-full'
                                : 'rounded-lg'
                            }
            `}
                        style={{ background: data.color }}
                    >
                        {/* Hover Overlay */}
                        <span
                            className="pointer-events-none absolute inset-0 flex
                transform flex-col items-center justify-center
                bg-black/27 opacity-0 transition-opacity duration-300
                group-hover:opacity-100"
                        >
                            <span className="text-center text-sm font-medium text-white">
                                View Details
                            </span>
                        </span>
                    </figure>

                    {/* Card Body */}
                    <div className="card-body p-3">
                        <article
                            className={`
                text-left text-sm text-gray-800
                ${layout === 'circle' ? 'text-center' : ''}
              `}
                        >
                            <h4 className="truncate text-base font-medium capitalize text-gray-900">
                                {data.name}
                            </h4>

                            {/* Hex Codes */}
                            <p className="hex__section flex items-center justify-center gap-1.5 text-xs text-gray-500">
                                <span
                                    className="transition-colors duration-300 hover:text-[#colorOne]"
                                    style={{ color: colorOne }}
                                >
                                    {colorOne}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="12"
                                    height="12"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="text-gray-400"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                                <span
                                    className="transition-colors duration-300 hover:text-[#colorTwo]"
                                    style={{ color: colorTwo }}
                                >
                                    {colorTwo}
                                </span>
                            </p>
                        </article>

                        {/* Small Color Dots */}
                        <div className="mt-1 flex justify-center gap-1">
                            <div
                                className="h-4.5 w-4.5 rounded-full transition-transform duration-300 hover:scale-114"
                                style={{ background: colorOne }}
                            />
                            <div
                                className="h-4.5 w-4.5 rounded-full transition-transform duration-300 hover:scale-114"
                                style={{ background: colorTwo }}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-2 flex items-center justify-end gap-1">
                            {/* View Code */}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setViewCode(true);
                                }}
                                className="text-gray-600 hover:text-accent"
                                aria-label="Show CSS Code"
                            >
                                <Code className="h-4 w-4" />
                            </Button>

                            {/* Download */}
                            <Button variant="ghost" size="icon" asChild>
                                <a
                                    href={url}
                                    download={`Piggment-${data.name}`}
                                    title={data.name}
                                    aria-label="Download Gradient"
                                >
                                    <Download className="h-4 w-4 text-gray-600" />
                                </a>
                            </Button>

                            {/* Save / Love */}
                            {mode !== 'delete' && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        saveGradient(data);
                                    }}
                                    aria-label={loved ? 'Unsave gradient' : 'Save gradient'}
                                >
                                    <Heart
                                        className={`h-4 w-4 transition-colors ${loved ? 'fill-red-500 text-red-500' : 'hover:fill-red-500'
                                            }`}
                                    />
                                </Button>
                            )}

                            {/* Delete */}
                            {mode === 'delete' && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete();
                                    }}
                                    aria-label="Delete Gradient"
                                    className="text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            )}

                            {/* Share */}
                            {/* <ShareDropdown data={data} save={saveGradient} /> */}
                        </div>
                    </div>
                </div>

                {/* Code Snippet Modal */}
                {viewCode && (
                    <Dialog open={viewCode} onOpenChange={setViewCode}>
                        <DialogContent className="max-w-md rounded-lg bg-white p-6">
                            <DialogHeader>
                                <DialogTitle>CSS Code</DialogTitle>
                            </DialogHeader>
                            <pre className="my-4 overflow-auto rounded bg-gray-50 p-3 text-xs text-gray-700">
                                <code>{`background: ${data.color};`}</code>
                            </pre>
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(data.color);
                                }}
                                size="sm"
                                className="w-fit"
                            >
                                Copy CSS
                            </Button>
                        </DialogContent>
                    </Dialog>
                )}

                {/* Detail Modal */}
                {/* {show && (
                    <ModalLayout show={show} data={data} setShow={setShow} />
                )} */}
            </>
        );
    }
);

SmallCard.displayName = 'SmallCard';

export default SmallCard;