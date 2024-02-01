import React from "react";
import Hamburguer from "./icons/Hamburguer";

export default function Header() {
  return (
    <header className="min-h-[50px] bg-[#fc246c]">
      <div className=" h-[100%]">
        <Hamburguer />
      </div>
    </header>
  );
}
