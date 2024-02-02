/** @format */

import React, { MouseEventHandler, useState } from "react";
import { linksLateralMenu } from "@/linksLateralMenu";
import { ChildrensMenu } from "./ChildrensMenu";
import { Link } from "@/interfaces/Links";
import { PrimaryMenu } from "./PrimaryMenu";
import CloseIcon from "./icons/CloseIcon";
import EmailIcon from "./icons/EmailIcon";
import CalendarIcon from "./icons/CalendarIcon";

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
      className={`bg-[#fc246c] flex flex-col   ${!visible ? "slide-right-animate px-4" : "slide-left-animate"
        }  w-[300px]  transition min-h-[90vh]`}
    >
      <header className="flex justify-end mb-3">
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
      <footer className="mt-auto">
        <hr />
        <div className="flex gap-2 [&>svg]:w-10 my-2 [&>svg]:cursor-pointer [&>svg]:transition hover:[&>svg]:scale-110">
          <EmailIcon />
          <CalendarIcon />
        </div>
      </footer>
    </aside>
  );
};

export default LateralMenu;
