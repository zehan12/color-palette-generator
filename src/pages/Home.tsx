import { Header } from "@/components/Header";
import { useElementHeight } from "@/hooks/useElementHeight";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const headerRef = useRef(null);
  const headerHeight = useElementHeight(headerRef);
  const [colorArray, setColorArray] = useState(handleGenerateRandomColor());

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
      if (e.keyCode === 32) setColorArray(handleGenerateRandomColor());
    }

    document.addEventListener("keydown", handleKeyDown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Header ref={headerRef} />
      <div
        className="w-full flex"
        style={{ height: `calc(100vh - ${headerHeight}px)` }}
      >
        <div className="text-3xl text-white flex grow">
          {colorArray.length &&
            colorArray.map((color) => (
              <div
                className="flex flex-col flex-1 items-center justify-end shadow-2xl"
                key={color}
                style={{ background: color }}
              >
                <div className="absolute bottom-60 flex flex-col gap-8 text-lg text-black">
                  {["1", "2", "3", "4", "5"].map((opt) => (
                    <div className="gap-4" key={opt}>
                      {opt}
                    </div>
                  ))}
                </div>
                <div className="my-32 uppercase font-semibold tracking-wider">{color.slice(1)}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const handleGenerateRandomColor = () => {
  const colors = [];
  for (let i = 1; i <= 5; i++) {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }
  return colors;
};

export default Home;
