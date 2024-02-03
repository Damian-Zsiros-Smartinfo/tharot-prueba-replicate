/** @format */

import React, { Suspense, useState, lazy } from "react";
import CloseIcon from "./icons/CloseIcon";
import {
  AppDispatch,
  changeActiveTab,
  closeTab
} from "@/redux/features/tabsSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";

export default function TabsLayout() {
  const tabs = useAppSelector((state) => state.tabsReducer.tabs);
  const activeIndex = useAppSelector((state) => state.tabsReducer.activeTab);
  const [activeFileComponent, setActiveFileComponent] = useState(
    tabs[activeIndex]?.nameFile || "Home.tsx"
  );
  const dispatch = useAppDispatch();

  const TabActiveView = lazy(() => import(`../tabs/${activeFileComponent}`));

  const onClick = (i: number) => {
    dispatch(changeActiveTab(i));
    setActiveFileComponent(tabs[i].nameFile);
  };

  const onClickCloseTab = (i: number) => {
    dispatch(changeActiveTab(i));
    dispatch(closeTab(i));
    if (i == activeIndex) setActiveFileComponent(tabs[i - 1].nameFile);
  };

  return (
    <section className="w-full min-h-[94vh] bg-gray-500 py-12  grid place-items-center">
      <section className="max-w-[70%] w-full h-full  bg-white rounded-lg ">
        <header className="h-[40px]  bg-gray-50 ">
          <ul className="flex gap-1 h-full items-center">
            {tabs.map((tab, i) => (
              <li
                className={` rounded  transition  w-24 h-full p-2  ${
                  i == activeIndex
                    ? "bg-zinc-50 opacity-80 hover:opacity-100 text-gray-800 "
                    : "bg-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                }`}
                key={tab.nameFile}
              >
                <article className="cursor-pointer flex justify-between w-full transition hover:[&>svg]:scale-110  items-center [&>svg]:w-4 [&>svg]:transition [&>svg]:opacity-70 hover:[&>svg]:opacity-100">
                  <button type="button" onClick={() => onClick(i)}>
                    <span>{tab.text}</span>
                  </button>
                  <button
                    type="button"
                    className="w-4"
                    onClick={() => onClickCloseTab(i)}
                  >
                    {!tab.fixed && <CloseIcon color="#000000" />}
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </header>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <TabActiveView route={activeFileComponent} />
          </Suspense>
        </main>
      </section>
    </section>
  );
}
