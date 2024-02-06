import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
interface Message {
  id: string;
  actor: string;
  text: string;
}

const socket = io("http://localhost:4000");

function Chat({
  NameActor,
  Messages,
  setMessages
}: {
  NameActor: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  Messages: Message[];
}) {
  const [Message, setMessage] = useState("");

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    socket.emit("server:addMessage", {
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
export default function ChatPage() {
  const [NameActor, setNameActor] = useState<string>("");
  const [NameObtained, setNameObtained] = useState(false);
  const [hasChange, sethasChange] = useState(false);
  const [Messages, setMessages] = useState<Message[]>([]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameActor(e.target.value);
  };
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (NameActor == "") return;
    setNameObtained(true);
    sethasChange(true);
  };
  useEffect(() => {
    if (hasChange) {
      console.log("dsadsa");
      socket.on("messages", (data: any) => {
        console.log(data);
        setMessages(data as Message[]);
      });
      sethasChange(false);
    }
  }, [hasChange]);
  return (
    <>
      {!NameObtained ? (
        <>
          <main className="grid place-items-center gap-4 w-full min-h-[100vh]">
            <section className="w-full max-w-[500px] text-center flex flex-col gap-4">
              <header className="bg-blue-500 text-white w-full py-4">
                <h1 className="text-4xl font-bold">Ingreso al Chat</h1>
              </header>
              <main>
                <input
                  onChange={(e) => onChange(e)}
                  type="text"
                  className="w-full border rounded outline-none p-4 mb-4"
                  placeholder="Ingresa tu nombre para entrar al chat"
                />
                <button
                  type="button"
                  onClick={(e) => onClick(e)}
                  className="bg-blue-700 p-3 text-white rounded"
                >
                  Entrar al chat
                </button>
              </main>
            </section>
          </main>
        </>
      ) : (
        <Chat
          Messages={Messages}
          setMessages={setMessages}
          NameActor={NameActor}
        />
      )}
    </>
  );
}
