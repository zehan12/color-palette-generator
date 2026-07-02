import { getState, setState } from "@/helpers";
import { GradientContext } from "@/providers/app-data-context-provider";
import { Gradient, Palette } from "@/types"
import { rgbToHex } from "@/utils";
import { FC, memo, use, useEffect, useRef, useState } from "react";

interface GradientPaletteCardPropsType {
    data: Gradient | Palette;
    cardMode: string;
    layout: string;
    mode: string;
    next: () => void;
    prev: () => void;
    type: string;
    isPalette: boolean;
}


// import LargeCard from './large-card';
// import GeneratorCard from './generator-card';
// import SmallCard from './small-card';
// import PaletteCard from './palette-card';
// import GeneratorPaletteCard from './generate-palette';


export const GradientPaletteCard: FC<GradientPaletteCardPropsType> = memo(({
    data,
    mode,
    layout,
    isPalette,
    cardMode,
    type,
    next,
    prev,
}) => {

    console.log(data, mode, layout, isPalette, cardMode, type, next, prev, "ignore");
    const textCanvas = useRef<HTMLCanvasElement | null>(null);
    const [url, setUrl] = useState('');
    const { setSnarkbar } = use(GradientContext);
    const [loved, setLoved] = useState(false);

    useEffect(() => {
        if (!isPalette && textCanvas.current) {
            const canvas = textCanvas.current;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const dataAngle = (data as Gradient).color.match(/\d+/g)?.[0];
            const angle = (Number(dataAngle || 0) * Math.PI) / 360;
            const x2 = Math.cos(angle) * 1360;
            const y2 = Math.sin(angle) * 768;

            const stops = (data as Gradient).color.match(/\d+%/g)?.map((p) => parseInt(p)) || [0, 100];
            const grd = ctx.createLinearGradient(0, 0, x2, y2);
            grd.addColorStop(stops[0] / 100, rgbToHex((data as Gradient).color, 0));
            grd.addColorStop(stops[1] / 100, rgbToHex((data as Gradient).color, 1));

            ctx.fillStyle = grd;
            ctx.fillRect(0, 0, 1360, 768);
            setUrl(canvas.toDataURL());
        }
    }, [data, isPalette]);

    const saveGradient = (datas: Gradient) => {
        const saved = getState('SAVED_GRADIENTS') || [];
        if (!saved.find((state) => state.id === datas.id)) {
            // logEvent('SAVE', 'Gradient added to pocket', 'SAVED GRADIENT');
            setState('SAVED_GRADIENTS', [datas, ...saved]);
            setLoved(true);
            setSnarkbar('Gradient saved succesfully. <a href="/saved">View</a>');
        }
    };

    const savePalette = (datas: Palette) => {
        const saved = getState('SAVED_PALETTE') || [];
        if (!saved.find((state) => state.id === datas.id)) {
            // logEvent('SAVE', 'Palette added to pocket', 'SAVED PALETTE');
            setState('SAVED_PALETTE', [datas, ...saved]);
            setLoved(true);
            setSnarkbar('Palette saved succesfully. <a href="/saved">View</a>');
        }
    };

    //         const copyText = (text?: string) => {
    //             const textField = document.createElement('textarea');
    //             let msg = 'CSS code copied to clipboard';

    //             if (!text) {
    //                 if (isPalette) {
    //                     const paletteData = data as Palette;
    //                     textField.innerText = `background: ${paletteData.colors[0]};
    // :root {
    // ${paletteData.colors.map((c, i) => `  --color${i + 1}: ${c};`).join('\n')}
    // }`;
    //                 } else {
    //                     const gradientData = data as Gradient;
    //                     textField.innerText = `
    // background: ${rgbToHex(gradientData.color, 0)};
    // background: -webkit-${gradientData.color};
    // background: ${gradientData.color};`;
    //                 }
    //             } else {
    //                 textField.innerText = text;
    //                 msg = 'Color code copied to clipboard';
    //             }

    //             document.body.appendChild(textField);
    //             textField.select();
    //             document.execCommand('copy');
    //             textField.remove();
    //             setSnarkbar(msg);
    //         };

    // if (!isPalette) {
    //     if (type === 'small') {
    //         return (
    //             <SmallCard
    //                 copyText={copyText}
    //                 data={data}
    //                 loved={loved}
    //                 saveGradient={saveGradient}
    //                 url={url}
    //                 layout={layout}
    //                 mode={mode}
    //             >
    //                 <canvas ref={textCanvas} width={1360} height={768} />
    //             </SmallCard>
    //         );
    //     } else if (type === 'large') {
    //         return (
    //             <LargeCard
    //                 copyText={copyText}
    //                 data={data}
    //                 loved={loved}
    //                 saveGradient={saveGradient}
    //                 url={url}
    //             >
    //                 <canvas ref={textCanvas} width={1360} height={768} />
    //             </LargeCard>
    //         );
    //     } else {
    //         return (
    //             <GeneratorCard
    //                 copyText={copyText}
    //                 data={data}
    //                 loved={loved}
    //                 saveGradient={saveGradient}
    //                 url={url}
    //                 next={next}
    //                 prev={prev}
    //             >
    //                 <canvas ref={textCanvas} width={1360} height={768} />
    //             </GeneratorCard>
    //         );
    //     }
    // }

    // if (type === 'generate') {
    //     return (
    //         <GeneratorPaletteCard
    //             copyText={copyText}
    //             data={data}
    //             loved={loved}
    //             saveGradient={savePalette}
    //             next={next}
    //             prev={prev}
    //         />
    //     );
    // }

    // return (
    //     <PaletteCard
    //         copyText={copyText}
    //         data={data}
    //         loved={loved}
    //         saveGradient={savePalette}
    //         layout={layout}
    //         cardMode={cardMode}
    //         mode={mode}
    //     />
    // );

    console.log(textCanvas, "canvas text")
    return (<>
        <canvas ref={textCanvas} width="1360" height="768" />
    </>)
}
);

GradientPaletteCard.displayName = "GradientPaletteCard";
