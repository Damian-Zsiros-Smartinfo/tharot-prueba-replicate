import { hasDifferenceOfDateMore3Min } from "@/utils/differenceOfDateMore3Min";
import React from "react";
import EditIcon from "./icons/EditIcon";
import { timeAgo } from "@/utils/timeAgo";
import { Message } from "@/types/Message";

interface Props {
  message: Message;
  NameActor: string;
  onClickDeleteMessage: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => void;
}

export default function MessageComponent({
  message,
  NameActor,
  onClickDeleteMessage
}: Props) {
  return (
    <article
      key={message.id}
      className={`border p-2 rounded max-w-[70%] w-full flex gap-5 justify-between scale-100  transition ${
        message.actor != NameActor ? "mr-auto" : "ml-auto"
      }`}
    >
      <div className="min-w-[80%]">
        <b className="text-[#3265b6] text-md opacity-90">
          {message.actor == NameActor ? "Yo" : message.actor}
        </b>
        <p className="text-lg transition">{message.text}</p>
        <b className="text-xs w-[100%] text-right opacity-70">
          {timeAgo(new Date(Date.parse(message.created_at || "")))}
        </b>
      </div>
      {!hasDifferenceOfDateMore3Min(
        new Date(Date.parse(message.created_at || ""))
      ) && <EditIcon onClick={onClickDeleteMessage} />}
    </article>
  );
}
