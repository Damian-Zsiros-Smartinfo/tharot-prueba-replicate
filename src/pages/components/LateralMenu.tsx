/** @format */

import React, { MouseEventHandler, useState } from "react";
import { linksLateralMenu } from "@/linksLateralMenu";
import { ChildrensMenu } from "./ChildrensMenu";
import { Link } from "@/interfaces/Links";
import { PrimaryMenu } from "./PrimaryMenu";
import CloseIcon from "./icons/CloseIcon";

export interface Props {
  visible: boolean;
  changeVisibleMenu: MouseEventHandler<HTMLButtonElement>;
}

const LateralMenu: React.FC<Props> = ({ visible, changeVisibleMenu }) => {
  const [isPrimaryMenu, setIsPrimaryMenu] = useState(true);
  const [childrensLink, setChildrensLink] = useState<Link[]>([]);

  const handleMenuItemClick = (childrens: Link[]) => {
    setIsPrimaryMenu(!isPrimaryMenu);
    setChildrensLink(childrens);
  };

  return (
    <aside
      className={`bg-[#fc246c]  ${
        !visible ? "slide-right-animate" : "slide-left-animate"
      }  w-[300px] px-4 transition min-h-[90vh]`}
    >
      <header className="flex justify-end">
        <button
          type="button"
          onClick={changeVisibleMenu}
          className="w-6 transition hover:scale-110"
        >
          <CloseIcon />
        </button>
      </header>
      <main>
        {" "}
        {isPrimaryMenu ? (
          <PrimaryMenu links={linksLateralMenu} onClick={handleMenuItemClick} />
        ) : (
          <ChildrensMenu
            childrens={childrensLink}
            onClick={handleMenuItemClick}
          />
        )}
      </main>
      <footer></footer>
    </aside>
  );
};

export default LateralMenu;
