import React, { Suspense, lazy, useState } from "react";
import CloseIcon from "./icons/CloseIcon";
import { AppDispatch, changeActiveTab } from "@/redux/features/tabsSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";

export default function TabsLayout() {
  const tabs = useAppSelector((state) => state.tabsReducer.tabs);
  const activeIndex = useAppSelector((state) => state.tabsReducer.activeTab);
  const [activeFileComponent, setActiveFileComponent] = useState(
    `../tabs/${tabs[activeIndex].nameFile}`
  );
  const [hasRenderTabNew, setHasRenderTabNew] = useState(true);
  const dispatch = useAppDispatch();
  const DynamicComponent = lazy(
    () => import(`../tabs/${tabs[activeIndex].nameFile}`)
  );

  const onClick = (i: number) => {
    dispatch(changeActiveTab(i));
    setActiveFileComponent(`../tabs/${tabs[activeIndex].nameFile}`);
  };
  return (
    <section className="w-full min-h-[94vh] bg-gray-500 py-12  grid place-items-center">
      <section className="max-w-[70%] w-full h-full  bg-white rounded-lg ">
        <header className="h-[40px]  bg-gray-50 ">
          <ul className="flex gap-1 h-full items-center">
            {tabs.map((tab, i) => (
              <>
                <li className="text-gray-500 rounded hover:bg-gray-100 hover:text-gray-800 transition  w-24 h-full p-2 bg-gray-200">
                  <button
                    type="button"
                    onClick={() => onClick(i)}
                    className="cursor-pointer flex justify-between w-full transition hover:[&>svg]:scale-110  items-center [&>svg]:w-4 [&>svg]:transition [&>svg]:opacity-70 hover:[&>svg]:opacity-100"
                  >
                    <span>{tab.text}</span>
                    {!tab.fixed && <CloseIcon color="#000000" />}
                  </button>
                </li>
              </>
            ))}
          </ul>
        </header>
        <main>
          <DynamicComponent />
        </main>
      </section>
    </section>
  );
}
