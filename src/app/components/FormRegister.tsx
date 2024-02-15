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

export default function Form({
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
        textLabel="Nombre"
        type="text"
        id="name"
        onChange={onChange}
        required
      />
      <Input
        textLabel="Email"
        type="email"
        id="email"
        onChange={onChange}
        required
      />
      <Input
        textLabel="Phone"
        type="phone"
        id="phone"
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? `Registrando...` : `Registrarme`}
      </button>
      <Link
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-center"
        href="/"
      >
        Si ya tienes cuenta. Ve al Login
      </Link>
    </form>
  );
}
