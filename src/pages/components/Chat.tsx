import { Message } from "@/types/Message";
import { hasDifferenceOfDateMore3Min } from "@/utils/differenceOfDateMore3Min";
import { timeAgo } from "@/utils/timeAgo";
import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import EditIcon from "./icons/EditIcon";
import MessageComponent from "./Message";
import FileUpload from "./FileUpload";
import { constants } from "../../../constants";
import { Toaster, toast } from "sonner";

export function Chat({
  NameActor,
  Messages,
  setMessages,
  socket,
  refContainer,
  messageSelected,
  setMessageSelected,
  isLoading,
}: {
  NameActor: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  Messages: Message[];
  socket: Socket;
  refContainer: React.RefObject<HTMLElement>;
  messageSelected: Message;
  setMessageSelected: React.Dispatch<React.SetStateAction<Message>>;
  isLoading: boolean;
}) {
  const [images, setImages] = useState<
    { file: { name: string }; arrayBuffer: Buffer; image: string }[]
  >([]);
  const [Message, setMessage] = useState("");
  const [FormSendMesage, setFormSendMesage] = useState(2);

  const sendMessage = () => {
    const dateStringNow = new Date().toString();
    const message = {
      actor: NameActor,
      text: Message.trim(),
      images,
      created_at: dateStringNow || "",
    };
    setMessages([
      ...Messages,
      {
        id: "",
        ...message,
      },
    ]);

    fetch(`${constants.API_URL}/messages`, {
      method: "POST",
      body: JSON.stringify(message),
    })
      .then((res) => res.json())
      .then((data) => {
        return console.log(data);
      });
    socket.emit("server:addMessage", message);
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

  const onClickDeleteMessage = (e: React.MouseEvent<SVGSVGElement>) => {
    const { parentElement } = e.target as SVGSVGElement;
    const inputElement = parentElement?.querySelector("input");

    if (inputElement) {
      toast("Escribe en el input el mensaje editado");
      inputElement.focus();
    } else {
      console.error("No se encontró un input dentro del padre.");
    }
  };
  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      socket.emit("server:editMessage", {
        messageId: messageSelected.id,
        messageEdited: messageSelected.text,
      });
      setMessages(
        Messages.map((message) => {
          if (message.id == messageSelected.id) {
            return {
              ...message,
              text: messageSelected.text,
            };
          }
          return message;
        })
      );
      toast("Mensaje editado correctamente");
    }
  };
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
        {isLoading ? (
          <>
            <span>Obteniendo mensajes del chat...</span>
          </>
        ) : (
          <section
            ref={refContainer}
            className="flex flex-col gap-2 overflow-y-scroll max-h-[50vh]   overflow: auto; messages-container px-4"
          >
            {Messages?.map((message) => (
              <MessageComponent
                NameActor={NameActor}
                message={message}
                handleKeyPress={handleKeyPress}
                onClickDeleteMessage={onClickDeleteMessage}
                key={message.id}
                images={message.images || []}
                messageSelected={messageSelected}
                setMessageSelected={setMessageSelected}
              />
            ))}
          </section>
        )}
        <footer>
          <textarea
            onChange={(e) => onChange(e)}
            placeholder="Ingresa el mensaje"
            className="w-full border rounded outline-none p-4"
            onKeyUp={async (e) => {
              if (e.key === "Enter" && FormSendMesage != 1) {
                console.log(Message);
                await sendMessage();
                setMessage("");
              }
            }}
            value={Message}
          ></textarea>
          <FileUpload
            setImages={setImages}
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
