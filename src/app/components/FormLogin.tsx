"use client";
import React from "react";
import Input from "./Input";
import { User } from "@/types/User";
import Link from "next/link";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  isSubmitting?: boolean | false;
}

export default function FormLogin({
  onSubmit,
  onChange,
  isSubmitting = false,
}: Props) {
  return (
    <form
      method="POST"
      onSubmit={onSubmit}
      className="flex flex-col gap-4 border p-4 rounded"
    >
      <Input
        textLabel="Email"
        type="email"
        id="email"
        onChange={onChange}
        required
      />
      <Input
        textLabel="Password"
        type="password"
        id="password"
        onChange={onChange}
        required
      />
      <div className="text-center flex flex-col gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isSubmitting ? `Iniciando sesion...` : `Iniciar sesion`}
        </button>

        <Link
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          href="/recover-password"
        >
          ¿Quieres recuperar tu contraseña?
        </Link>
        <Link
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          href="/register"
        >
          Registrarse
        </Link>
      </div>
    </form>
  );
}
