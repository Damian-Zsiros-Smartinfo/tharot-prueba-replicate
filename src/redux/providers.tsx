import React from "react";
import { store as storeInitial } from "./store";
import { Provider } from "react-redux";
interface Props {
  children: React.ReactNode;
  store?: any;
}

export default function Providers({
  children,
  store = storeInitial as any,
}: Props) {
  return <Provider store={store}>{children}</Provider>;
}
