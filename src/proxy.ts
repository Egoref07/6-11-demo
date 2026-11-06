import { NextResponse, type NextRequest } from "next/server";
import { readToken } from "@/lib/tokens";

export default async function checkAdmin(request: NextRequest) {
  const signedToken = request.cookies.get("session")?.value ?? null;
  const identity = await readToken(signedToken);

  if (identity?.role !== "admin") {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
