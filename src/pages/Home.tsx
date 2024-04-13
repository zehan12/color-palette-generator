import { AdjustPaletteAside } from "@/components/AdjustPaletteAside/AdjustPaletteAside";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useElementHeight } from "@/hooks/useElementHeight";
import { generateRandomHex } from "@/utils/color.util";
import { Copy, Lock, MoveHorizontal, Unlock, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const headerRef = useRef(null);
  const headerHeight = useElementHeight(headerRef);
  const [colorArray, setColorArray] = useState(generateRandomHex(5));
  const [isAdjustPaletteOpen, setAdjustPaletteOpen] = useState(false);
  const [lock, setLock] = useState(false);

  useEffect(() => {
    const handleUpdateUrl = () => {
      const newUrlIS =
        window.location.origin +
        "/" +
        colorArray.join("").replaceAll("#", "-").slice(1);
      history.pushState({}, "", newUrlIS);
    };

    handleUpdateUrl();
  }, [colorArray]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!isAdjustPaletteOpen && e.keyCode === 32) {
        e.preventDefault();
        setColorArray(() => generateRandomHex(5));
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAdjustPaletteOpen]);

  return (
    <>
      <Header
        ref={headerRef}
        isAdjustPaletteOpen={isAdjustPaletteOpen}
        setAdjustPaletteOpen={setAdjustPaletteOpen}
      />
      <div
        className="w-full flex"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        <div className="text-3xl text-white flex grow transition-width duration-300 ease-linear">
          {colorArray.length &&
            colorArray.map((color) => (
              <div
                className="flex flex-col flex-1 items-center justify-end shadow-2xl"
                key={color}
                style={{ background: color }}
              >
                <div className="absolute bottom-60 flex flex-col gap-8 text-lg text-black/80">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="hover:bg-black/10"
                          size={"icon"}
                          variant={"ghost"}
                        >
                          <X />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Remove color</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="hover:bg-black/10"
                          size={"icon"}
                          variant={"ghost"}
                        >
                          <MoveHorizontal />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Drag</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="hover:bg-black/10"
                          size={"icon"}
                          variant={"ghost"}
                        >
                          <Copy />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy HEX</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          className="hover:bg-black/10"
                          size={"icon"}
                          variant={"ghost"}
                        >
                          {lock ? <Lock /> : <Unlock />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Toggle Lock</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="my-32 uppercase font-semibold tracking-wider">
                  {color.slice(1)}
                </div>
              </div>
            ))}
          <AdjustPaletteAside
            isAdjustPaletteOpen={isAdjustPaletteOpen}
            setAdjustPaletteOpen={setAdjustPaletteOpen}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
