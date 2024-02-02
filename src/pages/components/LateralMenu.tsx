/** @format */

import React, { useState } from "react";
import { linksLateralMenu } from "@/linksLateralMenu";
import { ChildrensMenu } from "./ChildrensMenu";
import { Link } from "@/interfaces/Links";
import { PrimaryMenu } from "./PrimaryMenu";

export interface Props {
  visible: boolean;
}

const LateralMenu: React.FC<Props> = ({ visible }) => {
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
      {isPrimaryMenu ? (
        <PrimaryMenu links={linksLateralMenu} onClick={handleMenuItemClick} />
      ) : (
        <ChildrensMenu
          childrens={childrensLink}
          onClick={handleMenuItemClick}
        />
      )}
    </aside>
  );
};

export default LateralMenu;
