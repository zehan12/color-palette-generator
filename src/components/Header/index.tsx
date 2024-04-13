import {
  Ellipsis,
  Camera,
  Redo,
  Undo,
  Glasses,
  SunMedium,
  Eye,
  Share2,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Dispatch, RefObject, SetStateAction, forwardRef } from "react";

type HeaderProps = {
  isAdjustPaletteOpen: boolean;
  setAdjustPaletteOpen: Dispatch<SetStateAction<boolean>>;
  ref: RefObject<HTMLElement>;
};

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ isAdjustPaletteOpen, setAdjustPaletteOpen }, ref) => {
    return (
      <nav ref={ref} className="bg-white w-full border-b md:border-0">
        <div className="items-center justify-between mx-5 md:flex ">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <h1 className="text-sm font-base text-gray-500">
              Press the spacebar to generate color palettes!
            </h1>
          </div>
          <div className="flex justify-center items-center cursor-pointer gap-3">
            <Button variant={"ghost"}>
              <Ellipsis />
            </Button>

            <Separator
              className="bg-gray-300 h-7 w-[1px]"
              orientation="vertical"
            />
            <Button variant={"ghost"}>
              <Camera />
            </Button>
            <Separator
              className="bg-gray-300 h-7 w-[1px]"
              orientation="vertical"
            />
            <Button variant={"ghost"}>
              <Undo />
            </Button>
            <Button variant={"ghost"}>
              <Redo />
            </Button>
            <Separator
              className="bg-gray-300 h-7 w-[1px]"
              orientation="vertical"
            />
            <Button variant={"ghost"}>
              <Glasses />
            </Button>
            <Button
              variant={"ghost"}
              onClick={() => setAdjustPaletteOpen(!isAdjustPaletteOpen)}
            >
              <SunMedium />
            </Button>
            <Separator
              className="bg-gray-300 h-7 w-[1px]"
              orientation="vertical"
            />
            <Button variant={"ghost"} className="gap-2">
              <Eye />
              <p>View</p>
            </Button>
            <Button variant={"ghost"} className="gap-2">
              <Share2 />
              <p>Exports</p>
            </Button>
          </div>
        </div>
      </nav>
    );
  }
);
