import { useSocket } from "@/pages/components/SocketProvider";
import React, { useEffect, useState } from "react";
interface Message {
  id: string;
  actor: string;
  text: string;
}
export default function Chat() {
  const socket = useSocket();
  const [NameActor, setNameActor] = useState<string>("Anonimo");
  const [Messages, setMessages] = useState<Message[]>([
    {
      id: "dasdas",
      text: "Hola soy un ",
      actor: "Damian Zsiros"
    }
  ]);

  useEffect(() => {
    console.log(socket);
  }, []);
  return <div>Chat</div>;
}
