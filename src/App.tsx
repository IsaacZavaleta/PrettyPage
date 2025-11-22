import React, { useState } from "react";
import "./App.css";
import { GetDataInfo } from "./components/carta";
import { BunnyHeart } from "./components/image";

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  return (
    <div className="min-h-screen min-w-screen h-full w-full flex items-center justify-center relative overflow-hidden bg-[#fff9f6] p-4">
      {/* Sobre con corazón */}
      <div
        className={`envelope ${open ? "opened" : ""} cursor-pointer z-20`}
        onClick={handleOpen}
      >
        <img
          src={"/images/card-love.png"}
          alt="Sobre carta con corazón"
          className="envelope-image"
        />
      </div>

      <div
        className={`letter-fullscreen ${open ? "show" : ""} flex flex-col md:flex-row items-start md:items-center justify-center gap-6 md:gap-8 p-4`}
      >
        {/* Panel de texto (responsive) */}
        <div className="w-full md:basis-1/3 md:max-w-[33%] mt-2 text-start px-2">
          <GetDataInfo isLoaded={open} />
        </div>
        {/* Panel visual (responsive) */}
        <div className="w-full md:basis-2/3 md:max-w-[67%] mt-2 px-2">
          <BunnyHeart dateInit={new Date("2020-08-25")} phrase="Ha x is" />
        </div>
      </div>
    </div>
  );
}

export default App;
