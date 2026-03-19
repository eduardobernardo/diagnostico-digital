import { normalizePhone } from "@/lib/normalize-phone";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate email field exists
    if (!body.email) {
      return NextResponse.json({ error: "email é obrigatório" }, { status: 400 });
    }

    // Validate email format (basic regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "email inválido" }, { status: 400 });
    }

    // Validate conversion_identifier field exists
    if (!body.conversion_identifier) {
      return NextResponse.json({ error: "conversion_identifier é obrigatório" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const apiKey = process.env.RD_STATION_API_KEY;
    const url = `https://api.rd.services/platform/conversions?api_key=${apiKey}`;
    const payload = {
      event_type: "CONVERSION",
      event_family: "CDP",
      payload: {
        conversion_identifier: body.conversion_identifier,
        email: body.email,
        name: body.nome,
        phone: normalizePhone(body.telefone),
        company_name: body.empresa,
        cf_employees: body.funcionarios,
      },
    };

    void (async () => {
      try {
        if (!apiKey) {
          throw new Error("RD_STATION_API_KEY is not set");
        }

        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
      } catch (error) {
        console.error("RD Station Error:", error);
      } finally {
        clearTimeout(timeout);
      }
    })();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
