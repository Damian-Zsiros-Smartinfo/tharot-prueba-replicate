"use client";
import React, { useState } from "react";
import { UserLoginInfo } from "@/types/User";
import Form from "./components/FormLogin";
import { useRouter } from "next/navigation";
import { loginUser } from "./services/loginUser";
import Link from "next/link";

export default function RegisterPage() {
  const { push: redirect } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [UserInfo, setUserInfo] = useState<UserLoginInfo>({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({
      ...UserInfo,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const {
        data: { logued, token },
        error,
      } = await loginUser(UserInfo);
      const loguedBoolean = logued || false;
      if (error) {
        throw new Error();
      }
      if (loguedBoolean) {
        setIsSubmitting(false);
        redirect("/admin");
      } else {
        alert("Usuario y/o clave incorrecta/s. Intentalo de nuevo.");
      }
    } catch (error) {
      alert(
        "Ocurrió un error al intentar realizar el inicio de sesion. Contacte con el administrador."
      );
      setIsSubmitting(false);
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
