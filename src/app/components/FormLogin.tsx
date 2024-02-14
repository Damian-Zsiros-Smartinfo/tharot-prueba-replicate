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
  isSubmitting = false
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
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? `Iniciando sesion...` : `Iniciar sesion`}
      </button>

      <Link href="/recover-password">¿Quieres recuperar tu contraseña?</Link>
    </form>
  );
}
