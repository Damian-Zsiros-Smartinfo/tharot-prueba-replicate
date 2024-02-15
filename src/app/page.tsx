"use client";
import React, { useState } from "react";
import { UserLoginInfo } from "@/types/User";
import Form from "./components/FormLogin";
import { useRouter } from "next/navigation";
import { useAuthDispatch, useAuthSelector } from "@/redux/features/hooks";
import { loginUserAsync } from "@/redux/features/authSlice";
import { LayoutMain } from "./admin/page.client";
import Providers from "@/redux/providers";
import { authStore } from "@/redux/authStore";

export default function RegisterPage() {
  return (
    <Providers store={authStore}>
      <PageMain />
    </Providers>
  );
}

function PageMain() {
  const dispatch = useAuthDispatch();
  const logued = useAuthSelector((state) => state.authReducer.logued);
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
      await dispatch(loginUserAsync(UserInfo));
      const loguedBoolean = logued;
      if (loguedBoolean) {
        redirect("/admin");
      } else {
        alert("Usuario y/o clave incorrecta/s. Intentalo de nuevo.");
      }
    } catch (error) {
      alert(
        "Ocurrió un error al intentar realizar el inicio de sesion. Contacte con el administrador."
      );
    } finally {
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
