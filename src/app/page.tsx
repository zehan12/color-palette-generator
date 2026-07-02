"use client";
import { GradientPaletteCard } from "@/components/core/gradient-palette-card";
import { ExploreGradients, Hero, MoreSection } from "@/components/page/home";
import { CodeSnippnets } from "@/components/shared";
import { SmallCard } from "@/components/shared/card/small-card";
import { GradientContext } from "@/providers/app-data-context-provider";
import { use, useEffect } from "react";

export default function Home() {

  const { gradient, palette, loadGradients, loadpalettes } = use(GradientContext);

  useEffect(() => {
    if (gradient.length === 0 && palette.length === 0) {
      loadGradients(7);
      loadpalettes(7);
    }
  }, [gradient, palette, loadGradients, loadpalettes])

  console.log(palette, "p")

  return (
    <>
      <Hero />
      {/* <GradientPaletteCard
        data={palette[0]}
        cardMode={""}
        layout={""}
        mode={""}
        
        next={function (): void {
          throw new Error("Function not implemented.");
        }}
        prev={function (): void {
          throw new Error("Function not implemented.");
        }} isPalette={true} type={""}
      /> */}
      {/* <SmallCard>
        </SmallCard> */}
      {/* <CodeSnippnets
        copyText={() => { }}
        setViewCode={() => { }}
        data={gradient[0]}
      /> */}

      {/* {
        palette.length > 1 &&
        <CodeSnippnets
          copyText={() => { }}
          setViewCode={() => { }}
          data={palette[0]}
          isPalette
        />
      } */}
      <ExploreGradients />
      <MoreSection />
    </>
  );
}