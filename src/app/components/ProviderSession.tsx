import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { validateToken } from "../utils/JWTUtils";
import { NextPageContext } from "next";
import { middleware } from "../middleware";

export default function ProviderSession({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return <>{children}</>;
}

export async function getServerSideProps(ctx: NextPageContext) {
  return await middleware(ctx.req);
}
