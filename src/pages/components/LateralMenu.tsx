/** @format */

import React, { useState } from "react";
import { linksLateralMenu } from "@/linksLateralMenu";
import ArrowRightIcon from "./icons/ArrowRightIcon";
import { ChildrensMenu } from "./ChildrensMenu";
import { Link } from "@/interfaces/Links";

interface PrimaryMenuProps {
  links: Link[];
  onClick: (childrens: Link[]) => void;
}

export interface Props {
  visible: boolean;
}

const PrimaryMenu: React.FC<PrimaryMenuProps> = ({ links, onClick }) => (
  <ul>
    {links.map((link) => (
      <li key={link.link}>
        <button
          type="button"
          onClick={() => onClick(link.childrens || [])}
          className="flex justify-between items-center text-white transition hover:scale-105 w-full"
        >
          <button className="p-4">{link.text}</button>
          <button type="button" className="w-7">
            <ArrowRightIcon />
          </button>
        </button>
      </li>
    ))}
  </ul>
);

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
