import { NextRequest, NextResponse } from "next/server";

const LOOPS_API_KEY = process.env.LOOPS_API_KEY;
const LOOPS_API_URL = "https://app.loops.so/api/v1/contacts/create";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    if (!LOOPS_API_KEY) {
      console.error("Loops API key not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    // Map user types to Loops mailing lists
    const mailingListMap: Record<string, string> = {
      "building-code-expert": "building_code_experts",
      "real-estate": "real_estate_professionals",
      "construction": "construction_companies"
    };

    // Prepare Loops contact data
    const loopsData = {
      email: data.email,
      firstName: data.name.split(" ")[0] || data.name,
      lastName: data.name.split(" ").slice(1).join(" ") || "",
      source: "website_lead_capture",
      userGroup: data.userType,
      mailingLists: [mailingListMap[data.userType] || "general"],
      customFields: {
        company: data.company || "",
        companySize: data.companySize || "",
        userType: data.userType,
        signupDate: new Date().toISOString(),
      },
    };

    // Send to Loops
    const response = await fetch(LOOPS_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOOPS_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loopsData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Loops API error:", errorText);
      throw new Error(`Loops API error: ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed",
      contactId: result.id,
    });

  } catch (error) {
    console.error("Error in loops-capture route:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}