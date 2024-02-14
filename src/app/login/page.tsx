"use client";
import React, { useState } from "react";
import { UserLoginInfo } from "@/types/User";
import Form from "../components/FormLogin";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/loginUser";
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
    setIsSubmitting(true);
    const { data, error } = await loginUser(UserInfo);

    const loguedBoolean = (data?.logued as Boolean) || false || false;
    if (loguedBoolean) {
      redirect("/admin");
    } else {
      alert("Usuario y/o clave incorrecta/s. Intentalo de nuevo.");
      setIsSubmitting(false);
    }
  };
  return (
    <main className="w-full min-h-screen grid place-items-center">
      <form action="" onSubmit={onSubmit}></form>
      <Form
        onChange={onChange}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </main>
  );
}
