/** @format */

import React, { Suspense, lazy } from "react";
import CloseIcon from "./icons/CloseIcon";
import { changeActiveTab, closeTab } from "@/redux/features/tabsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/features/hooks";
import { NavigationBar } from "@/interfaces/NavigationBar";

interface Props {
  tabs: NavigationBar[];
  activeIndex: number;
  activeFileComponent: string;
  setActiveFileComponent: React.Dispatch<React.SetStateAction<string>>;
}

export default function TabsLayout({
  activeFileComponent,
  setActiveFileComponent,
}: Props) {
  const tabs = useAppSelector((state) => state.tabsReducer.tabs);
  const activeIndex = useAppSelector((state) => state.tabsReducer.activeTab);

  const dispatch = useAppDispatch();

  const TabActiveView = lazy(
    () => import(`../tabs/${activeFileComponent || "HomeTab.tsx"}`)
  );

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
    <section className="w-full  bg-gray-500 py-12  grid place-items-center">
      <section className="max-w-[90%] overflow-auto w-full h-full  bg-white rounded-lg ">
        <header className="h-[60px]  bg-gray-50 ">
          <ul className="flex gap-1 items-center overflow-x-auto overflow-y-hidden">
            {tabs.map((tab, i) => (
              <li
                className={`border-x rounded  transition  min-w-30 w-fit h-full p-2  ${
                  i == activeIndex
                    ? "bg-white opacity-80 hover:opacity-100 text-gray-800  "
                    : "bg-gray-200 text-gray-400 hover:bg-gray-100 hover:text-gray-800"
                }`}
                key={i}
              >
                <article className="cursor-pointer flex justify-between gap-2 w-full transition hover:[&>svg]:scale-110  items-center [&>svg]:w-4 [&>svg]:transition [&>svg]:opacity-70 hover:[&>svg]:opacity-100">
                  <button type="button" onClick={() => onClick(i)}>
                    <span>{tab.text}</span>
                  </button>
                  <button
                    type="button"
                    className="w-4"
                    onClick={() => {
                      onClickCloseTab(i);
                    }}
                  >
                    {!tab.fixed && <CloseIcon color="#000000" />}
                  </button>
                </article>
              </li>
            ))}
          </ul>
        </header>
        <main className="h-full min-h-[400px]">
          <Suspense fallback={<div>Loading...</div>}>
            <TabActiveView route={activeFileComponent} />
          </Suspense>
        </main>
      </section>
    </section>
  );
}
