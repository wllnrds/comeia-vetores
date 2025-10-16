import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authHeader =
    request.headers.get("Authorization") ||
    request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Basic")) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const credentials = Buffer.from(
    authHeader.split(" ")[1],
    "base64"
  ).toString();
  const [username, password] = credentials.split(":");

  // Replace with your actual authentication logic (e.g., check against a database)
  if (username === "user" && password === "password") {
    const response = NextResponse.next();
    return response;
  } else {
    return new NextResponse(JSON.stringify({ message: "Wrong password" }), {
      status: 401,
    });
  }
}

export const config = {
  matcher: "/api/mock/claro/:path*",
};
