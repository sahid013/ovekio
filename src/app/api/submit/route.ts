import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

type SubmitPayload = {
  category: string;
  subOption: string;
  subOptionPrice: string;
  extras: { title: string; price: string }[];
  estimate: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    description: string;
  };
};

export async function POST(request: Request) {
  try {
    const body: SubmitPayload = await request.json();
    const { category, subOption, subOptionPrice, extras, estimate, contact } =
      body;

    // Basic validation
    if (!contact.name || !contact.email || !contact.phone) {
      return NextResponse.json(
        { error: "Le nom, l'email et le téléphone sont requis." },
        { status: 400 }
      );
    }

    const extrasSection =
      extras.length > 0
        ? `
        <tr>
          <td style="padding:12px 16px;color:#6b6b6b;font-size:14px;border-bottom:1px solid #f0f0f0;">Options</td>
          <td style="padding:12px 16px;font-size:14px;font-weight:500;color:#1a1a1a;border-bottom:1px solid #f0f0f0;text-align:right;">
            ${extras.map((e) => `${e.title} (${e.price})`).join("<br/>")}
          </td>
        </tr>`
        : "";

    const htmlContent = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#8b5cf6,#7c3aed);padding:32px;border-radius:16px 16px 0 0;">
        <h1 style="color:#ffffff;font-size:22px;margin:0;">Nouvelle demande de devis</h1>
        <p style="color:rgba(255,255,255,0.8);font-size:14px;margin:8px 0 0;">via Ovekio</p>
      </div>

      <div style="background:#ffffff;border:1px solid #e2e2e5;border-top:none;padding:32px;border-radius:0 0 16px 16px;">
        <h2 style="font-size:16px;color:#1a1a1a;margin:0 0 16px;">Contact</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
          <tr>
            <td style="padding:12px 16px;color:#6b6b6b;font-size:14px;border-bottom:1px solid #f0f0f0;">Nom</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:500;color:#1a1a1a;border-bottom:1px solid #f0f0f0;text-align:right;">${contact.name}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;color:#6b6b6b;font-size:14px;border-bottom:1px solid #f0f0f0;">Email</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:500;color:#1a1a1a;border-bottom:1px solid #f0f0f0;text-align:right;">
              <a href="mailto:${contact.email}" style="color:#8b5cf6;text-decoration:none;">${contact.email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 16px;color:#6b6b6b;font-size:14px;border-bottom:1px solid #f0f0f0;">Téléphone</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:500;color:#1a1a1a;border-bottom:1px solid #f0f0f0;text-align:right;">${contact.phone || "—"}</td>
          </tr>
        </table>

        <h2 style="font-size:16px;color:#1a1a1a;margin:0 0 16px;">Projet</h2>
        <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
          <tr>
            <td style="padding:12px 16px;color:#6b6b6b;font-size:14px;border-bottom:1px solid #f0f0f0;">Catégorie</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:500;color:#1a1a1a;border-bottom:1px solid #f0f0f0;text-align:right;">${category}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;color:#6b6b6b;font-size:14px;border-bottom:1px solid #f0f0f0;">Type</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:500;color:#1a1a1a;border-bottom:1px solid #f0f0f0;text-align:right;">${subOption} (${subOptionPrice})</td>
          </tr>
          ${extrasSection}
          <tr>
            <td style="padding:12px 16px;color:#6b6b6b;font-size:14px;font-weight:600;">Estimation totale</td>
            <td style="padding:12px 16px;font-size:14px;font-weight:700;color:#8b5cf6;text-align:right;">${estimate}</td>
          </tr>
        </table>

        ${
          contact.description
            ? `
        <h2 style="font-size:16px;color:#1a1a1a;margin:0 0 12px;">Description du projet</h2>
        <div style="background:#f7f7f8;border:1px solid #e2e2e5;border-radius:12px;padding:16px;">
          <p style="font-size:14px;color:#1a1a1a;line-height:1.6;margin:0;white-space:pre-wrap;">${contact.description}</p>
        </div>`
            : ""
        }
      </div>
    </div>`;

    // If no API key is set, log the email and skip sending (test mode)
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
      console.log("=== TEST MODE — Email not sent ===");
      console.log("To:", "contact@ovek.io");
      console.log("Subject:", `Nouvelle demande — ${category} / ${subOption}`);
      console.log("Payload:", JSON.stringify({ category, subOption, subOptionPrice, extras, estimate, contact }, null, 2));
      console.log("=================================");
      return NextResponse.json({ success: true });
    }

    const { error } = await resend.emails.send({
      from: "Ovekio <contact@ovek.io>",
      to: "contact@ovek.io",
      replyTo: contact.email,
      subject: `Nouvelle demande — ${category} / ${subOption}`,
      html: htmlContent,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Échec de l'envoi de l'email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json(
      { error: "Erreur interne du serveur." },
      { status: 500 }
    );
  }
}
