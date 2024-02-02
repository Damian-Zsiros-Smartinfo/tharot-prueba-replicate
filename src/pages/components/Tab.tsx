import { useAppSelector } from "@/redux/features/hooks";
import React from "react";

export default function Tab() {
  const id = useAppSelector((state) => state.tabsReducer.id);

  return <div>{id}</div>;
}
