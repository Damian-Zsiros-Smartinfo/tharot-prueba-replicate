import { Message } from "@/types/Message";
import { timeAgo } from "@/utils/timeAgo";
import { useRef, useState } from "react";
import { Socket } from "socket.io-client";

export function Chat({
  NameActor,
  Messages,
  setMessages,
  socket
}: {
  NameActor: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  Messages: Message[];
  socket: Socket;
}) {
  const [Message, setMessage] = useState("");
  const messagesSectionRef = useRef(null);
  const [FormSendMesage, setFormSendMesage] = useState(1);

  const sendMessage = () => {
    const message = {
      id: crypto.randomUUID(),
      actor: NameActor,
      text: Message.trim()
    };
    setMessages([...Messages, message]);
    socket.emit("server:addMessage", {
      id: crypto.randomUUID(),
      text: Message,
      actor: NameActor
    });
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sendMessage();
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
        <section className="flex flex-col gap-2 overflow-y-scroll max-h-[50vh]   overflow: auto; ">
          {Messages.map((message) => (
            <article
              key={message.id}
              className={`border p-2 rounded max-w-[70%] w-full ${
                message.actor != NameActor ? "mr-auto" : "ml-auto"
              }`}
            >
              <b>{message.actor == NameActor ? "Yo" : message.actor}</b>
              <p>{message.text}</p>
              <b className="text-sm w-[100%] text-right">
                {timeAgo(new Date(Date.parse(message.created_at || "")))}
              </b>
            </article>
          ))}
        </section>
        <footer>
          <textarea
            onChange={(e) => onChange(e)}
            placeholder="Ingresa el mensaje"
            className="w-full border rounded outline-none p-4"
            onKeyUp={async (e) => {
              if (e.key === "Enter" && FormSendMesage != 1) {
                await sendMessage();
              }
            }}
          ></textarea>
          {FormSendMesage == 1 && (
            <button
              type="button"
              onClick={(e) => onClick(e)}
              className="bg-blue-700 p-3 text-white rounded"
            >
              Enviar
            </button>
          )}
          <div>
            <span>Enviar con: </span>

            <select
              name="formAtSend"
              id=""
              onChange={(e) => setFormSendMesage(Number(e.target.value))}
            >
              <option value="2">ENTER</option>
              <option value="1" selected>
                Boton
              </option>
            </select>
          </div>
        </footer>
      </section>
    </main>
  );
}
