"use client";
import { hasDifferenceOfDateMore3Min } from "@/utils/differenceOfDateMore3Min";
import React, { useState } from "react";
import EditIcon from "./icons/EditIcon";
import { timeAgo } from "@/utils/timeAgo";
import { Image, Message } from "@/types/Message";
import ImageComponent from "next/image";
import GalleryImage from "./GalleryImage";
import CloseIcon from "./icons/CloseIcon";
import DeleteIcon from "./icons/DeleteIcon";
import ImageNext from "next/image";

interface Props {
  message: Message;
  NameActor: string;
  onClickDeleteMessage: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => void;
  handleKeyPress: React.KeyboardEventHandler<HTMLInputElement>;
  images?:
    | Image[]
    | {
        file: {
          name: string;
        };
        arrayBuffer: Buffer;
        images?: Image[];
      }[];
  messageSelected: Message;
  setMessageSelected: React.Dispatch<React.SetStateAction<Message>>;
  onClickDelete: (id: string) => void;
}

export default function MessageComponent({
  message = {
    id: 0,
    actor: "",
    text: "",
    created_at: "",
  },
  NameActor = "",
  messageSelected = {
    id: 0,
    actor: "",
    text: "",
    created_at: "",
  },
  setMessageSelected,
  handleKeyPress,
  onClickDelete,
}: Props) {
  const [isVisibleGallery, setisVisibleGallery] = useState(false);
  const onClickEditMessage = (e: React.MouseEvent<SVGSVGElement>) => {
    const element = e.target as SVGSVGElement;
    const inputElement =
      element.parentElement?.parentElement?.querySelector("input");

    if (inputElement) {
      inputElement.disabled = false;
      inputElement.focus();
    } else {
      console.error("No se encontró un input dentro del padre.");
    }
  };

  function imagesToGallery(message: Message) {
    return (
      message.images?.map((image) => {
        return {
          original: image.image || "",
          thumbnail: image.image || "",
        };
      }) || []
    );
  }
  const onChangeMessageEdit: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    console.log(message);
    setMessageSelected({
      ...message,
      text: e.target.value,
    });
    if (message.text == messageSelected.text) return;
  };
  return (
    <article
      key={message.id}
      className={`border p-2 rounded w-full flex gap-5 justify-between scale-100  transition max-w-[80%] flex-col ${
        message.actor != NameActor ? "mr-auto" : "ml-auto"
      }`}
    >
      <div className="min-w-[80%]">
        <div>
          <b className="text-[#3265b6] text-md opacity-90">
            {message.actor == NameActor ? "Yo" : message.actor}
          </b>
          <input
            name="messageValue"
            value={
              messageSelected.id == message.id &&
              message.actor == messageSelected.actor
                ? messageSelected.text
                : message.text
            }
            onKeyDown={
              messageSelected.id == message.id &&
              message.actor == messageSelected.actor
                ? handleKeyPress
                : undefined
            }
            onChange={onChangeMessageEdit}
            className="text-lg transition w-full text-center"
            disabled={message.actor == messageSelected.actor}
          />
          <b className="text-xs w-[100%] text-right opacity-70">
            {timeAgo(message.created_at || "")}
          </b>
        </div>
        <div className="flex gap-4 p-4 flex-wrap justify-center">
          {message.images && message.images.length > 0 ? (
            <>
              {isVisibleGallery ? (
                <GalleryImage images={imagesToGallery(message)}></GalleryImage>
              ) : (
                <section className="flex gap-4 justify-center">
                  {message.images && message.images.length > 0
                    ? message.images.map((image, i) => {
                        if (i > 4) return null;
                        return (
                          <>
                            <ImageNext
                              src={image.image || ""}
                              alt={message.actor}
                              width={50}
                              height={50}
                            />
                          </>
                        );
                      })
                    : null}
                  <button
                    onClick={() => setisVisibleGallery(!isVisibleGallery)}
                    className="h-full flex justify-center items-center border px-4"
                  >
                    +{message.images.length - 4}
                  </button>
                </section>
              )}
            </>
          ) : null}
        </div>
      </div>

      {!hasDifferenceOfDateMore3Min(message.created_at || "") &&
      message.actor == NameActor ? (
        <div className="flex items-center h-full justify-center gap-4">
          <EditIcon onClick={onClickEditMessage} />
          <DeleteIcon onClick={() => onClickDelete(message.id + "")} />
        </div>
      ) : null}
    </article>
  );
}
