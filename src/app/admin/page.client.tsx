"use client";
import { useEffect, useState } from "react";
import Layout from "../../pages/components/Layout";
import TabsLayout from "../../pages/components/TabsLayout";
import { useAppSelector } from "@/redux/features/hooks";
import Providers from "@/redux/providers";
import Head from "next/head";
import { validateToken } from "../utils/JWTUtils";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (!router) return;
    const token = getCookie("token");
    if (!validateToken(token as string)) router.push("/");
  }, [router]);

  return (
    <LayoutMain>
      <HomePageClient />
    </LayoutMain>
  );
}

function HomePageClient() {
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
