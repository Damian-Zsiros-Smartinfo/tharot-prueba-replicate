"use client";
import React, { useState } from "react";
import { User } from "@/types/User";
import Form from "../components/FormRegister";
import { registerUser } from "../services/registerUser";
import { useRouter } from "next/navigation";
import { isSavedUser } from "../api/services/usersService";
import { useAuthDispatch, useAuthSelector } from "@/redux/features/hooks";
import { registerUserAsync } from "@/redux/features/authSlice";
import Providers from "@/redux/providers";
import { authStore } from "@/redux/authStore";

export default function RegisterPage() {
  return (
    <Providers store={authStore}>
      <RegisterCom />
    </Providers>
  );
}

export function RegisterCom() {
  const { push: redirect } = useRouter();
  const registered = useAuthSelector((state) => state.authReducer.registered);
  const exists = useAuthSelector((state) => state.authReducer.exists);
  const error = useAuthSelector((state) => state.authReducer.error);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [UserInfo, setUserInfo] = useState<User>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const dispatch = useAuthDispatch();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...UserInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(registerUserAsync(UserInfo));

    const statusRegister = registered;
    if (exists == true) {
      alert(
        "Ya hay otro usuario con ese email o con el numero de telefono. Intenta con otro email o numero de telefono"
      );
      return setIsSubmitting(false);
    }
    console.error(error);
    if (error && error.message != "") {
      alert(
        "Ocurrió un error al intentar realizar el registro. Pruebe con otro correo electronico o si persiste contacte con el administrador."
      );
      setIsSubmitting(false);
    } else {
      alert("Has sido registrado correctamente...");
      setIsSubmitting(false);
      redirect("/");
    }
  };
  return (
    <main className="w-full min-h-screen grid place-items-center">
      <Form
        onChange={onChange}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}
