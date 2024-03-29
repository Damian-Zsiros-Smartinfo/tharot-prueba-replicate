/** @format */

import ArrowLeftIcon from "./icons/ArrowLeftIcon";
import ArrowRightIcon from "./icons/ArrowRightIcon";

interface ChildrensMenuProps {
  childrens?: any[];
  onClick: (childrens: any[]) => void;
  onClickAddTab: (info: any) => void;
}

export const ChildrensMenu: React.FC<ChildrensMenuProps> = ({
  childrens,
  onClick,
  onClickAddTab,
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
      {childrens?.map((link, i) => (
        <li key={i}>
          <div className="cursor-pointer flex justify-between items-center text-white transition hover:scale-105 w-full">
            <div className="p-4 w-full flex justify-between [&>svg]:w-8">
              <span>{link.text}</span>
              <button
                type="button"
                className="w-7"
                onClick={() => {
                  onClickAddTab({
                    text: link.text,
                    component: link.component || "",
                    link: link.link,
                  });
                }}
              >
                <ArrowRightIcon />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </>
);

export default ChildrensMenu;
