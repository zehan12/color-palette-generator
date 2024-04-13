import { Header } from "@/components/Header";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Home = () => {
  const [colorArray, setColorArray] = useState(handleGenerateRandomColor());

  const handleUpdateUrl = () => {
    const newUrlIS =
      window.location.origin +
      "/" +
      colorArray.join("").replaceAll("#", "-").slice(1);
    history.pushState({}, "", newUrlIS);
  };

  const handleNext = () => {
    setColorArray(handleGenerateRandomColor());
  };

  useEffect(() => {
    handleUpdateUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorArray]);

  return (
    <>
      <div>
        <button onClick={handleNext}>refresh</button>
        <div onClick={handleUpdateUrl} className="bg-red-400">
          url params:{colorArray.join("").replaceAll("#", "-").slice(1)}
        </div>
      </div>
      <Header />
      <div className="w-full h-[94.2vh] bg-[#EF798A] flex">
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
