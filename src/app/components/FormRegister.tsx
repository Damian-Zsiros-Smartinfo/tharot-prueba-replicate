"use client";
import React from "react";
import Input from "./Input";
import { User } from "@/types/User";

interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  isSubmitting?: boolean | false;
}

export default function Form({
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
      <input type="text" onChange={(e) => {}} />
      <Input
        textLabel="Password"
        type="password"
        id="password"
        onChange={onChange}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? `Registrando...` : `Registrarme`}
      </button>
    </form>
  );
}
