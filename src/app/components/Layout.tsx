/** @format */

import Providers from "@/redux/providers";
import React, { MouseEventHandler, useState } from "react";
import Header from "./Header";
import LateralMenu from "./LateralMenu";

interface Props {
  children?: React.ReactNode;
  setActiveFileComponent: React.Dispatch<React.SetStateAction<string>>;
}

export default function Layout({ children, setActiveFileComponent }: Props) {
  const [visibleLateralMenu, setVisibleLateralMenu] = useState(true);
  const changeVisibleMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    setVisibleLateralMenu(!visibleLateralMenu);
  };
  return (
    <Providers>
      <Header onClick={changeVisibleMenu} visible={visibleLateralMenu} />
      <main className="w-full flex h-screen   overflow-y-auto max-h-screen">
        <LateralMenu
          setActiveFileComponent={setActiveFileComponent}
          visible={visibleLateralMenu}
          changeVisibleMenu={changeVisibleMenu}
        />
        <main className="w-full h-full  bg-gray-500 ">{children}</main>
      </main>
    </Providers>
  );
}
