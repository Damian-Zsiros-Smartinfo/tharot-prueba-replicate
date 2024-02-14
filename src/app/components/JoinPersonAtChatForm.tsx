"use client";
import React, { ChangeEvent } from "react";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

export default function JoinPersonAtChatForm({
  onChange,
  onClick,
  onKeyDown,
}: Props) {
  return (
    <main className="grid place-items-center gap-4 w-full min-h-[70vh]">
      <section className="w-full max-w-[500px] text-center flex flex-col gap-4">
        <header className="bg-blue-500 text-white w-full py-4">
          <h1 className="text-4xl font-bold">Ingreso al Chat</h1>
        </header>
        <main>
          <input
            onChange={(e) => onChange(e)}
            type="text"
            onKeyDown={onKeyDown}
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
  );
}
