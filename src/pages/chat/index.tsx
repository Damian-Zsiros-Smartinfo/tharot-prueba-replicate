import { constants } from "../../../constants";
import React, { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import JoinPersonAtChatForm from "../components/JoinPersonAtChatForm";
import { Message } from "@/types/Message";
import { Chat } from "../components/Chat";

const socket = io(constants.API_URL);

export default function ChatPage() {
  const [NameActor, setNameActor] = useState<string>("");
  const [NameObtained, setNameObtained] = useState(false);
  const [, sethasChange] = useState(false);
  const [Messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLElement>(null);
  const [messageSelected, setMessageSelected] = useState<Message>({
    id: "",
    actor: "",
    text: "",
    created_at: "",
    images: [],
  });
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameActor(e.target.value);
  };

  const getMessages = () => {
    fetch(`${constants.API_URL}/messages`).then((res: Response) => {
      res.json().then((data) => {
        const { messages } = data;
        setMessages(messages);
      });
    });
  };

  useEffect(() => {
    socket.on("server:loadmessages", (data) => {
      return setMessages(data);
    });
  }, []);

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (NameActor == "") return;
    await getMessages();
    setNameObtained(true);
    sethasChange(true);
  };

  const onEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      {!NameObtained ? (
        <JoinPersonAtChatForm onChange={onChange} onClick={onClick} />
      ) : (
        <Chat
          refContainer={chatContainerRef}
          socket={socket}
          Messages={Messages}
          setMessages={setMessages}
          NameActor={NameActor}
          messageSelected={messageSelected}
          setMessageSelected={setMessageSelected}
        />
      )}
    </>
  );
}
