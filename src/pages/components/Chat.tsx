import { Message } from "@/types/Message";
import { hasDifferenceOfDateMore3Min } from "@/utils/differenceOfDateMore3Min";
import { timeAgo } from "@/utils/timeAgo";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import EditIcon from "./icons/EditIcon";
import MessageComponent from "./Message";
import FileUpload from "./FileUpload";

export function Chat({
  NameActor,
  Messages,
  setMessages,
  socket,
  refContainer,
}: {
  NameActor: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  Messages: Message[];
  socket: Socket;
  refContainer: React.RefObject<HTMLElement>;
}) {
  const [Message, setMessage] = useState("");
  const messagesSectionRef = useRef(null);
  const [FormSendMesage, setFormSendMesage] = useState(2);

  const sendMessage = () => {
    const message = {
      id: crypto.randomUUID(),
      actor: NameActor,
      text: Message.trim(),
    };
    setMessages([...Messages, message]);
    socket.emit("server:addMessage", {
      id: crypto.randomUUID(),
      text: Message,
      actor: NameActor,
    });
  };

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sendMessage();
    setMessage("");
  };
  useEffect(() => {
    if (refContainer.current) {
      refContainer.current.scrollTop = refContainer.current.scrollHeight;
    }
  }, [Messages, refContainer]);

  const onClickDeleteMessage = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {};

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <main className="grid place-items-center gap-4 w-full min-h-[100vh] rounded-lg">
      <section className="w-full max-w-[500px] text-center flex flex-col gap-4 rounded">
        <header className="bg-blue-500 text-white w-full p-4 rounded">
          <h1 className="text-4xl font-bold">Chat</h1>
          <h2>
            Nombre actual en la sala: <b>{NameActor}</b>
          </h2>
        </header>
        <section
          ref={refContainer}
          className="flex flex-col gap-2 overflow-y-scroll max-h-[50vh]   overflow: auto; messages-container px-4"
        >
          {Messages.map((message) => (
            <MessageComponent
              NameActor={NameActor}
              message={message}
              onClickDeleteMessage={onClickDeleteMessage}
              key={message.id}
            />
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
                setMessage("");
              }
            }}
            value={Message}
          ></textarea>
          <FileUpload
            accept={{
              "image/*": [".jpeg", ".png"],
            }}
          />

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
              <option value="2" selected>
                ENTER
              </option>
              <option value="1">Boton</option>
            </select>
          </div>
        </footer>
      </section>
    </main>
  );
}
