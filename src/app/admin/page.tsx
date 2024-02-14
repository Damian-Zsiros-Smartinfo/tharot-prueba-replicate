"use client";
import { useState } from "react";
import Layout from "../../pages/components/Layout";
import TabsLayout from "../../pages/components/TabsLayout";
import { useAppSelector } from "@/redux/features/hooks";
import Providers from "@/redux/providers";
import Head from "next/head";

export default function Home() {
  return (
    <LayoutMain>
      <HomePage />
    </LayoutMain>
  );
}

function HomePage() {
  const tabs = useAppSelector((state) => state.tabsReducer.tabs);
  const activeIndex = useAppSelector((state) => state.tabsReducer.activeTab);
  const [activeFileComponent, setActiveFileComponent] = useState(
    tabs[activeIndex]?.nameFile || "Home.tsx"
  );
  return (
    <Layout setActiveFileComponent={setActiveFileComponent}>
      <TabsLayout
        tabs={tabs}
        activeIndex={activeIndex}
        activeFileComponent={activeFileComponent}
        setActiveFileComponent={setActiveFileComponent}
      />
    </Layout>
  );
}

export function LayoutMain({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}
