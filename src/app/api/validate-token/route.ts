import { validateToken } from "./../../utils/JWTUtils";
import { UserVerify, UserWithoutId } from "@/app/types/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "../services/usersService";
import { generateToken } from "@/app/utils/JWTUtils";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    if (!token) throw new Error();
    const tokenDecoded = validateToken(token);
    if (tokenDecoded == null)
      return NextResponse.json({
        valid: false,
      });
    return NextResponse.json({
      valid: true,
      tokenDecoded,
    });
  } catch (error) {
    return NextResponse.json(
      {
        logued: false,
        error,
      },
      { status: 500 }
    );
  }
}
