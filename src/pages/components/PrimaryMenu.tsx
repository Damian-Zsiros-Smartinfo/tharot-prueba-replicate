/** @format */

import { Link } from "@/interfaces/Links";
import ArrowRightIcon from "./icons/ArrowRightIcon";

interface PrimaryMenuProps {
  links: Link[];
  onClick: (childrens: Link[]) => void;
}

export const PrimaryMenu: React.FC<PrimaryMenuProps> = ({
  links = [],
  onClick
}) => {
  return (
    <ul>
      {links.map((link, i) => (
        <li key={i}>
          <article className="flex justify-between items-center text-white transition hover:scale-105 w-full">
            <div className="p-4">{link.text}</div>
            <button type="button" onClick={() => onClick(link.childrens || [])}>
              <div className="w-7">
                <ArrowRightIcon />
              </div>
            </button>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default PrimaryMenu;
