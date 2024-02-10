import { hasDifferenceOfDateMore3Min } from "@/utils/differenceOfDateMore3Min";
import React from "react";
import EditIcon from "./icons/EditIcon";
import { timeAgo } from "@/utils/timeAgo";
import { Image, Message } from "@/types/Message";

interface Props {
  message: Message;
  NameActor: string;
  onClickDeleteMessage: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => void;
  images?: Image[] | {
    file: {
      name: string;
    };
    arrayBuffer: Buffer;
  }[]
}

export default function MessageComponent({
  message,
  NameActor,
  onClickDeleteMessage,
  images
}: Props) {
  return (
    <article
      key={message.id}
      className={`border p-2 rounded max-w-[70%] w-full flex gap-5 justify-between scale-100  transition ${message.actor != NameActor ? "mr-auto" : "ml-auto"
        }`}
    >
      <div className="min-w-[80%]">
        <div>
          <b className="text-[#3265b6] text-md opacity-90">
            {message.actor == NameActor ? "Yo" : message.actor}
          </b>
          <p className="text-lg transition">{message.text}</p>
          <b className="text-xs w-[100%] text-right opacity-70">
            {timeAgo(new Date(Date.parse(message.created_at || "")))}
          </b>
        </div>
        <div className="flex gap-4 p-4 flex-wrap justify-center">
          {message.images?.map(image => {
            return (
              <>
                <img className="max-w-12" src={image.link_image} />
              </>
            )
          })}
        </div>
      </div>

      {!hasDifferenceOfDateMore3Min(
        new Date(Date.parse(message.created_at || ""))
      ) && <EditIcon onClick={onClickDeleteMessage} />}
    </article>
  );
}
