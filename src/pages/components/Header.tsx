/** @format */

import React, {
  ChangeEvent,
  MouseEventHandler,
  useEffect,
  useState
} from "react";
import Hamburguer from "./icons/Hamburguer";
import Image from "next/image";
import Link from "next/link";
import { getHourSpanish } from "@/utils/getHourSpanish";
import UserIcon from "./icons/UserIcon";
import OnlineUserIcon from "./icons/OnlineUserIcon";
import LateralMenu from "./LateralMenu";
interface Props {
  visible: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}
export default function Header({ onClick }: Props) {
  const [dateActual, setDateActual] = useState("");
  useEffect(() => {
    const newDate = getHourSpanish();
    setDateActual(newDate);
  }, []);

  return (
    <>
      <header className="w-[100%] flex flex-row relative">
        <section
          className={`min-h-[50px] bg-[#fc246c] flex justify-between relative w-full `}
        >
          <div className="flex gap-1 items-center">
            <button
              type="button"
              className="p-3 bg-[#ca3365] hover:[&>svg]:scale-125 [&>svg]:transition"
              onClick={onClick}
            >
              <Hamburguer />
            </button>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo do site"
                width={180}
                height={40}
                className=""
              />
            </Link>
          </div>
          <input
            type="search"
            placeholder="Buscar..."
            className="my-3 w-[30rem] outline-none rounded px-4"
          />
          <div className="mr-4 text-white flex gap-2 [&>svg]:w-[2rem] items-center text-center">
            <span>{dateActual}</span>
            <button
              type="button"
              className="[&>svg]:w-[30px] hover:scale-110 transition"
            >
              <OnlineUserIcon />
            </button>
            <span className="h-[100%] text-5xl">|</span>
            <button
              type="button"
              className="[&>svg]:w-[30px] hover:scale-110 transition"
            >
              <UserIcon />
            </button>
          </div>
        </section>
      </header>
    </>
  );
}
