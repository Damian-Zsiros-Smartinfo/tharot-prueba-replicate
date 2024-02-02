/** @format */

import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import LateralMenu from "./components/LateralMenu";
import { MouseEventHandler, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [visibleLateralMenu, setVisibleLateralMenu] = useState(true);
  const changeVisibleMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    setVisibleLateralMenu(!visibleLateralMenu);
  };
  return (
    <>
      <Header onClick={changeVisibleMenu} visible={visibleLateralMenu} />
      <main>
        <LateralMenu
          visible={visibleLateralMenu}
          changeVisibleMenu={changeVisibleMenu}
        ></LateralMenu>
      </main>
    </>
  );
}
