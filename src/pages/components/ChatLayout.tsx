import React from "react";
import SocketProvider from "./SocketProvider";
interface Props {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: Props) {
  return <SocketProvider>{children}</SocketProvider>;
}
