/** @format */

import { useState } from "react";
import Layout from "./components/Layout";
import TabsLayout from "./components/TabsLayout";
import { useAppSelector } from "@/redux/features/hooks";
import Providers from "@/redux/providers";
import { NavigationBar } from "@/interfaces/NavigationBar";

interface Props extends NavigationBar {}

export default function Home(props: Props) {
  const tabs = useAppSelector((state) => state.tabsReducer.tabs);
  const activeIndex = useAppSelector((state) => state.tabsReducer.activeTab);
  const [activeFileComponent, setActiveFileComponent] = useState(
    tabs[activeIndex]?.nameFile || "Home.tsx"
  );
  return (
    <LayoutMain>
      <Layout setActiveFileComponent={setActiveFileComponent}>
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
