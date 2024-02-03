/** @format */

import { useState } from "react";
import Layout from "./components/Layout";
import TabsLayout from "./components/TabsLayout";
import HomeTab from "./tabs/HomeTab";
import { useAppSelector } from "@/redux/features/hooks";
import Providers from "@/redux/providers";

interface Props {
  tabs: {
    text: string;
    nameFile: string;
    fixed: boolean;
  }[];
  activeIndex: number;
}

export default function Home({}: Props) {
  const tabs = useAppSelector((state) => state.tabsReducer.tabs);
  const activeIndex = useAppSelector((state) => state.tabsReducer.activeTab);
  const [activeFileComponent, setActiveFileComponent] = useState(
    tabs[activeIndex]?.nameFile || "Home.tsx"
  );
  return (
    <LayoutMain>
      <Layout tabs={tabs} activeIndex={activeIndex}>
        <TabsLayout
          tabs={tabs}
          activeIndex={activeIndex}
          activeFileComponent={activeFileComponent}
          setActiveFileComponent={setActiveFileComponent}
        />
      </Layout>
    </LayoutMain>
  );
}

export function LayoutMain({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
