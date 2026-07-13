"use server";

import { z } from "zod";
import { supabase } from "./supabase";
import { checkRateLimit } from "./rateLimit";

// Input sanitization helper to prevent XSS
function sanitize(val: string | undefined): string {
  if (!val) return "";
  return val
    .trim()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ---------------------------------------------------------
// 1. Zod Schemas
// ---------------------------------------------------------
const WaitlistSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).trim(),
  email: z.string().email("Invalid email address").max(100).trim().toLowerCase(),
  source: z.string().max(100).trim().optional(),
});

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).trim(),
  email: z.string().email("Invalid email address").max(100).trim().toLowerCase(),
  subject: z.string().max(150).trim().optional(),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000).trim(),
});

const NewsletterSchema = z.object({
  email: z.string().email("Invalid email address").max(100).trim().toLowerCase(),
});

const DemoSchema = z.object({
  name: z.string().min(1, "Name is required").max(100).trim(),
  company: z.string().min(1, "Company name is required").max(150).trim(),
  email: z.string().email("Invalid email address").max(100).trim().toLowerCase(),
  phone: z.string().max(30).trim().optional(),
  preferred_date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  message: z.string().max(1000).trim().optional(),
});

// ---------------------------------------------------------
// 2. Server Actions
// ---------------------------------------------------------

export async function joinWaitlistAction(data: { name: string; email: string; source?: string }) {
  try {
    const isAllowed = await checkRateLimit();
    if (!isAllowed) {
      return { success: false, message: "Too many attempts. Please try again in a minute." };
    }

    const validated = WaitlistSchema.parse(data);
    const name = sanitize(validated.name);
    const email = sanitize(validated.email);
    const source = sanitize(validated.source) || "direct";

    // Insert into Supabase waitlist table
    const { error } = await supabase
      .from("waitlist")
      .insert({ name, email, source, status: "pending" });

    if (error) {
      if (error.code === "23505") { // Unique key constraint in postgres
        return { success: false, message: "This email is already registered on our early access list!" };
      }
      return { success: false, message: `Database error: ${error.message}` };
    }

    // Log tracking event
    await trackEventAction("waitlist_signup", { email, source });

    return { success: true, message: "Thank you! You have been added to the early access list." };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { success: false, message: err.issues[0].message };
    }
    return { success: false, message: err.message || "An unexpected error occurred." };
  }
}

export async function sendContactMessageAction(data: { name: string; email: string; subject?: string; message: string }) {
  try {
    const isAllowed = await checkRateLimit();
    if (!isAllowed) {
      return { success: false, message: "Too many attempts. Please try again in a minute." };
    }

    const validated = ContactSchema.parse(data);
    const name = sanitize(validated.name);
    const email = sanitize(validated.email);
    const subject = sanitize(validated.subject) || "No Subject";
    const message = sanitize(validated.message);

    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, subject, message, status: "unread" });

    if (error) {
      return { success: false, message: `Database error: ${error.message}` };
    }

    await trackEventAction("contact_message_submitted", { email, subject });

    return { success: true, message: "Message sent! We will get back to you shortly." };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { success: false, message: err.issues[0].message };
    }
    return { success: false, message: err.message || "An unexpected error occurred." };
  }
}

export async function subscribeNewsletterAction(emailInput: string) {
  try {
    const isAllowed = await checkRateLimit();
    if (!isAllowed) {
      return { success: false, message: "Too many attempts. Please try again in a minute." };
    }

    const validated = NewsletterSchema.parse({ email: emailInput });
    const email = sanitize(validated.email);

    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email, status: "active" });

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "You are already subscribed to our newsletter!" };
      }
      return { success: false, message: `Database error: ${error.message}` };
    }

    await trackEventAction("newsletter_subscribed", { email });

    return { success: true, message: "Subscribed! Thank you for joining our newsletter." };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { success: false, message: err.issues[0].message };
    }
    return { success: false, message: err.message || "An unexpected error occurred." };
  }
}

export async function bookDemoAction(data: {
  name: string;
  company: string;
  email: string;
  phone?: string;
  preferred_date: string;
  message?: string;
}) {
  try {
    const isAllowed = await checkRateLimit();
    if (!isAllowed) {
      return { success: false, message: "Too many attempts. Please try again in a minute." };
    }

    const validated = DemoSchema.parse(data);
    const name = sanitize(validated.name);
    const company = sanitize(validated.company);
    const email = sanitize(validated.email);
    const phone = sanitize(validated.phone);
    const preferred_date = validated.preferred_date; // Safe date string
    const message = sanitize(validated.message);

    const { error } = await supabase
      .from("demo_requests")
      .insert({
        name,
        company,
        email,
        phone,
        preferred_date,
        message,
        status: "pending",
      });

    if (error) {
      return { success: false, message: `Database error: ${error.message}` };
    }

    await trackEventAction("demo_booked", { email, company, date: preferred_date });

    return { success: true, message: "Demo requested successfully! We will coordinate with you soon." };
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return { success: false, message: err.issues[0].message };
    }
    return { success: false, message: err.message || "An unexpected error occurred." };
  }
}

export async function trackDownloadAction(platform: string, source: string = "direct") {
  try {
    const cleanPlatform = sanitize(platform);
    const cleanSource = sanitize(source);

    const { error } = await supabase
      .from("downloads")
      .insert({
        platform: cleanPlatform,
        source: cleanSource,
      });

    if (error) {
      console.error("Failed to track download: ", error.message);
    }
    
    // Log secondary analytics event
    await trackEventAction("app_download", { platform: cleanPlatform, source: cleanSource });

    return { success: true };
  } catch (err) {
    console.error("Download tracking failed", err);
    return { success: false };
  }
}

export async function trackEventAction(eventType: string, payload: Record<string, any> = {}, source: string = "website") {
  try {
    const cleanEventType = sanitize(eventType);
    const cleanSource = sanitize(source);

    const { error } = await supabase
      .from("website_events")
      .insert({
        event_type: cleanEventType,
        payload,
        source: cleanSource,
      });

    if (error) {
      console.error("Failed to track website event: ", error.message);
    }

    return { success: true };
  } catch (err) {
    console.error("Event logging failed", err);
    return { success: false };
  }
}
