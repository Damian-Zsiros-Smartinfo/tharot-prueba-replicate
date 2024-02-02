/** @format */

import { Link } from "@/interfaces/Links";
import ArrowRightIcon from "./icons/ArrowRightIcon";

interface PrimaryMenuProps {
  links: Link[];
  onClick: (childrens: Link[]) => void;
}

export const PrimaryMenu: React.FC<PrimaryMenuProps> = ({ links, onClick }) => (
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
