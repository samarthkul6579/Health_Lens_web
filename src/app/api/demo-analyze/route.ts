import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const isAllowed = await checkRateLimit(10); // allow up to 10 demo attempts per minute per IP
    if (!isAllowed) {
      return NextResponse.json(
        { success: false, message: "Too many analysis requests. Please try again later." },
        { status: 429 }
      );
    }

    const { report_id } = await req.json();
    if (!report_id || (report_id !== "cbc" && report_id !== "lipid")) {
      return NextResponse.json({ success: false, message: "Invalid report_id" }, { status: 400 });
    }

    const backendUrl = process.env.BACKEND_API_URL || "http://localhost:8000";
    
    // Call the public backend endpoint in the Express app
    const response = await fetch(`${backendUrl}/reports/demo-analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ report_id }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json(
        { success: false, message: `Backend error: ${errText}` },
        { status: response.status }
      );
    }

    const resJson = await response.json();
    // Return backend data back to frontend
    return NextResponse.json(resJson);
  } catch (error: any) {
    console.error("Demo-analyze proxy error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to analyze report" },
      { status: 500 }
    );
  }
}
