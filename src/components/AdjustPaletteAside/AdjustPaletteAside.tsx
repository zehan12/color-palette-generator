import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Dispatch, FC, SetStateAction } from "react";

type AdjustPaletteAsideProps = {
  isAdjustPaletteOpen: boolean;
  setAdjustPaletteOpen: Dispatch<SetStateAction<boolean>>;
};

export const AdjustPaletteAside: FC<AdjustPaletteAsideProps> = ({
  isAdjustPaletteOpen,
  setAdjustPaletteOpen,
}) => {
  return (
    <div className="relative">
      <div
        className={cn(
          "w-72 transition-width duration-300 ease-linear overflow-hidden",
          !isAdjustPaletteOpen && "w-0",
          !isAdjustPaletteOpen && "absolute left-0 top-0"
        )}
      >
        <div className="flex justify-center items-center border-[1px] py-3">
          <h4 className="text-black/70 text-lg font-semibold">
            Adjust palette
          </h4>
        </div>
        <div className="w-72 absolute bottom-0 flex items-center justify-center gap-3 border-[1px] p-7">
          <Button
            variant={"outline"}
            onClick={() => setAdjustPaletteOpen(!isAdjustPaletteOpen)}
            className="text-black/80 text-sm font-semibold w-28 h-9"
          >
            Cancel
          </Button>
          <Button
            variant={"default"}
            className="bg-blue-600 hover:bg-blue-700 text-sm font-semibold w-28 h-9"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
