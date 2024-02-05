import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
interface Message {
  id: string;
  actor: string;
  text: string;
}

export default function Chat() {
  const socket = useRef(io("http://localhost:4000"));
  const [NameActor, setNameActor] = useState<string>("");
  const [NameObtained, setNameObtained] = useState(false);
  const [Messages, setMessages] = useState<Message[]>([]);
  const [Message, setMessage] = useState("");

  useEffect(() => {
    socket.current.on("server:loadmessages", (data: any) => {
      setMessages(data as Message[]);
    });
    if (!NameObtained) {
      setNameActor(prompt("Ingresa tu nombre para acceder al chat:") || "");
      setNameObtained(true);
    }
  }, [NameObtained]);
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    socket.current.emit("server:addMessage", {
      id: crypto.randomUUID(),
      text: Message,
      actor: NameActor
    });
  };
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <main className="grid place-items-center gap-4 w-full min-h-[100vh]">
      <section className="w-full max-w-[500px] text-center flex flex-col gap-4">
        <header className="bg-blue-500 text-white w-full">
          <h1 className="text-4xl font-bold">Chat</h1>
          <h2>
            Nombre actual en la sala: <b>{NameActor}</b>
          </h2>
        </header>
        <section className="flex flex-col gap-2 ">
          {Messages.map((message) => (
            <article
              key={message.id}
              className={`border p-2 rounded max-w-[70%] w-full ${
                message.actor != NameActor ? "mr-auto" : "ml-auto"
              }`}
            >
              <b>{message.actor == NameActor ? "Yo" : message.actor}</b>
              <p>{message.text}</p>
            </article>
          ))}
        </section>
        <footer>
          <textarea
            onChange={(e) => onChange(e)}
            placeholder="Ingresa el mensaje"
            className="w-full border rounded outline-none p-4"
          ></textarea>
          <button
            type="button"
            onClick={(e) => onClick(e)}
            className="bg-blue-700 p-3 text-white rounded"
          >
            Enviar
          </button>
        </footer>
      </section>
    </main>
  );
}
