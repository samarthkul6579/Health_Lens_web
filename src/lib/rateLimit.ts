import { headers } from "next/headers";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_LIMIT = 5; // 5 requests per window

export async function checkRateLimit(limit = MAX_LIMIT, windowMs = WINDOW_MS): Promise<boolean> {
  try {
    const headersList = await headers();
    // Retrieve IP address from standard proxy headers
    const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim() || 
               headersList.get("x-real-ip") || 
               "127.0.0.1";
    
    const now = Date.now();
    const ipData = rateLimitMap.get(ip);
    
    if (!ipData) {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
      return true;
    }
    
    if (now - ipData.lastReset > windowMs) {
      rateLimitMap.set(ip, { count: 1, lastReset: now });
      return true;
    }
    
    if (ipData.count >= limit) {
      return false;
    }
    
    ipData.count += 1;
    rateLimitMap.set(ip, ipData);
    return true;
  } catch (error) {
    // Fallback if headers are not available (e.g. during build-time compilation)
    return true;
  }
}
