/** @format */

import { Link } from "@/interfaces/Links";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import ArrowRightIcon from "./icons/ArrowRightIcon";

interface ChildrensMenuProps {
  childrens?: Link[];
  onClick: (childrens: Link[]) => void;
}

export const ChildrensMenu: React.FC<ChildrensMenuProps> = ({
  childrens,
  onClick
}) => (
  <>
    <button
      type="button"
      className="w-7 py-2 hover:scale-110 transition"
      onClick={() => onClick([])}
    >
      <ArrowLeftIcon />
    </button>
    <ul>
      {childrens?.map((link) => (
        <li key={link.link}>
          <button
            className="flex justify-between items-center text-white transition hover:scale-105 w-full"
            type="button"
          >
            <button className="p-4 w-full flex justify-between [&>svg]:w-8">
              <span>{link.text}</span>
              <ArrowRightIcon />
            </button>
          </button>
        </li>
      ))}
    </ul>
  </>
);
