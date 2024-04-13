import { Header } from "@/components/Header";
import { useEffect, useState } from "react";

const Home = () => {
  const [colorArray, setColorArray] = useState(handleGenerateRandomColor());

  const handleUpdateUrl = () => {
    const newUrlIS =
      window.location.origin +
      "/" +
      colorArray.join("").replaceAll("#", "-").slice(1);
    history.pushState({}, "", newUrlIS);
  };

  useEffect(() => {
    handleUpdateUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Header />
      <div className="w-full h-[93.3vh] bg-[#EF798A] flex">
        <div className="text-3xl text-white flex grow">
          {colorArray.length &&
            colorArray.map((color) => (
              <div
                className="flex flex-col flex-1 items-center justify-end"
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
                <div className="my-32">{color.slice(1)}</div>
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
