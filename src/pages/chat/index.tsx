import { constants } from "../../../constants";
import React, { useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import JoinPersonAtChatForm from "../components/JoinPersonAtChatForm";
import { Message } from "@/types/Message";
import Chat from "../components/Chat";
import { Toaster } from "sonner";

const socket = io(constants.API_URL);

export default function ChatPage() {
  const [NameActor, setNameActor] = useState<string>("");
  const [NameObtained, setNameObtained] = useState(false);
  const [, sethasChange] = useState(false);
  const [Messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    fetch(`${constants.API_URL}/messages`)
      .then((res: Response) => {
        res.json().then((data) => {
          const { messages } = data;
          setMessages(messages);
          setIsLoading(false);
        });
      })
      .catch((err) => setIsLoading(false));
  };

  useEffect(() => {
    socket.on("server:loadmessages", (data) => {
      console.log(data);
      return setMessages(data);
    });
    getMessages();
  }, []);

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await getMessages();
    if (NameActor == "") return;
    setNameObtained(true);
    sethasChange(true);
  };

  const onKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      await getMessages();
      if (NameActor == "") return;
      setNameObtained(true);
      sethasChange(true);
    }
  };

  const onEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <Toaster />
      {!NameObtained ? (
        <JoinPersonAtChatForm
          onChange={onChange}
          onClick={onClick}
          onKeyDown={onKeyDown}
        />
      ) : (
        <Chat
          isLoading={isLoading}
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
