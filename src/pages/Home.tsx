import { AdjustPaletteAside } from "@/components/AdjustPaletteAside/AdjustPaletteAside";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useContainerDimensions } from "@/hooks/useElementHeight";
import { cn } from "@/lib/utils";
import { generateRandomHex } from "@/utils/color.util";
import { Copy, Lock, MoveHorizontal, Plus, Unlock, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const headerRef = useRef(null);
  const { height: headerHeight } = useContainerDimensions(headerRef);
  const [colorArray, setColorArray] = useState(generateRandomHex(5));
  const [isAdjustPaletteOpen, setAdjustPaletteOpen] = useState(false);
  const [lock, setLock] = useState(false);
  const [hoverColor, setHoverColor] = useState("");
  const [isAddButtonHover, setAddButtonHover] = useState(false);

  const handleAddButtonMouseEvent = (color: string) => {
    if (color === hoverColor) setAddButtonHover(true);
    return;
  };

  const handleAddButtonMouseOut = () => {
    setAddButtonHover(false);
  };

  const handleMouseOver = (color: string) => {
    setHoverColor(color);
  };

  const handleMouseOut = (color: string) => {
    setHoverColor((prev) => (prev === color ? "" : color));
  };

  const handleDeleteColorPaletteItem = (color: string) => {
    const filteredArray = colorArray.filter((c) => c !== color);
    setColorArray(filteredArray);
  };

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
            colorArray.map((color: string, idx: number) => (
              <div
                className={cn(
                  "flex flex-col flex-1 items-center justify-end shadow-2xl"
                )}
                onMouseEnter={() => handleMouseOver(color)}
                onMouseOver={() => handleMouseOver(color)}
                onMouseOut={() => handleMouseOut(color)}
                key={color}
                id="color-div"
                style={{ background: color }}
              >
                <div
                  style={{
                    visibility: hoverColor === color ? "visible" : "hidden",
                  }}
                  className={cn(
                    "absolute bottom-60 flex-col gap-8 text-lg text-black/80 flex"
                  )}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={() => handleDeleteColorPaletteItem(color)}
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
                          style={{ visibility: "visible" }}
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
                <div
                  className="w-full h-40 z-10"
                  onMouseOver={() => handleAddButtonMouseEvent(color)}
                  onMouseEnter={() => handleAddButtonMouseEvent(color)}
                  onMouseOut={handleAddButtonMouseOut}
                >
                  {idx !== colorArray.length - 1 && (
                    <div
                      key={""}
                      className={cn(
                        "w-full ml-6 mr-1 flex justify-end",
                        isAddButtonHover && color === hoverColor ? "" : "hidden"
                      )}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={"default"}
                              size={"icon"}
                              className="h-12 w-12 rounded-full bg-white hover:bg-gray-200 shadow-xl border-8 border-white"
                            >
                              <Plus className="text-black font-sm" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="flex flex-col justify-center items-center">
                              <p className="font-semibold">Add Color</p>
                              <p>Keep pressed</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
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
