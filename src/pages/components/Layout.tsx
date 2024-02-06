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
      <main className="w-full flex h-[94vh] ">
        <LateralMenu
          setActiveFileComponent={setActiveFileComponent}
          visible={visibleLateralMenu}
          changeVisibleMenu={changeVisibleMenu}
        ></LateralMenu>
        <main className="w-full">{children}</main>
      </main>
    </Providers>
  );
}
