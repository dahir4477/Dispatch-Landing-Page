import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { first_name, email, phone, trucks, weekly_revenue } = body;

    // Validation
    if (!first_name || typeof first_name !== "string") {
      return NextResponse.json(
        { success: false, error: "First name is required." },
        { status: 400 }
      );
    }
    const trimmedFirstName = first_name.trim();
    if (trimmedFirstName.length < 1) {
      return NextResponse.json(
        { success: false, error: "First name is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }
    const trimmedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Supabase env vars missing");
      return NextResponse.json(
        { success: false, error: "Server configuration error. Please try again later." },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("early_access_leads")
      .insert({
        first_name: trimmedFirstName,
        email: trimmedEmail,
        phone: phone && typeof phone === "string" ? phone.trim() || null : null,
        trucks: trucks && typeof trucks === "string" ? trucks.trim() || null : null,
        weekly_revenue: weekly_revenue && typeof weekly_revenue === "string" ? weekly_revenue.trim() || null : null,
      })
      .select("id, created_at")
      .single();

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { success: false, error: "This email is already on the list. We'll be in touch!" },
          { status: 409 }
        );
      }
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { success: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list! We'll reach out soon.",
      id: data?.id,
      created_at: data?.created_at,
    });
  } catch (err) {
    console.error("Lead API error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
