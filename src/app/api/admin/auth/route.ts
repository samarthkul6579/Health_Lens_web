import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    
    // Check against config env parameters (with local fallbacks)
    const adminUser = process.env.ADMIN_USERNAME || "admin";
    const adminPass = process.env.ADMIN_PASSWORD || "HealthLensAdmin2026!";

    if (username === adminUser && password === adminPass) {
      const response = NextResponse.json({ success: true, message: "Authenticated successfully" });
      
      // Set secure HTTP-only cookie session
      response.cookies.set("admin_session", "authenticated_healthlens_admin_2026", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day session
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Authentication failed" },
      { status: 500 }
    );
  }
}
