import { notFound } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { optionalEnv, requiredEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ token: string }>;
};

type Purchase = {
  id: string;
  email: string;
  token_expires_at: string;
  download_count: number | null;
};

type DownloadFile = {
  title: string;
  description: string;
  envKey: string;
  filename: string;
};

const files: DownloadFile[] = [
  {
    title: "House Building Mistakes PDF",
    description: "Common mistakes to avoid while building your house.",
    envKey: "MISTAKES_FILE_PATH",
    filename: "mistakes-pdf.pdf"
  },
  {
    title: "Printable Site Checklist",
    description: "Print and use this checklist at your construction site.",
    envKey: "CHECKLIST_FILE_PATH",
    filename: "site-checklist.pdf"
  },
  {
    title: "Grey Structure Calculator",
    description: "Excel calculator for rough cost planning.",
    envKey: "CALCULATOR_FILE_PATH",
    filename: "grey-structure-calculator.xlsx"
  }
];

async function createSignedUrl(path: string) {
  const bucket = requiredEnv("SUPABASE_STORAGE_BUCKET");
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUrl(path, 60 * 15);

  if (error || !data?.signedUrl) {
    return null;
  }

  return data.signedUrl;
}

export default async function DownloadPage({ params }: PageProps) {
  const { token } = await params;
  const brand = optionalEnv("NEXT_PUBLIC_BRAND_NAME", "Punjab Ghar Toolkit");
  const supportWhatsapp = optionalEnv("NEXT_PUBLIC_SUPPORT_WHATSAPP", "91XXXXXXXXXX");

  const { data: purchase, error } = await supabaseAdmin
    .from("purchases")
    .select("id,email,token_expires_at,download_count")
    .eq("token", token)
    .eq("status", "paid")
    .maybeSingle<Purchase>();

  if (error || !purchase) {
    notFound();
  }

  const isExpired = new Date(purchase.token_expires_at).getTime() < Date.now();
  if (isExpired) {
    return (
      <main className="section" style={{ maxWidth: 760 }}>
        <div className="success-box">
          <p className="pill">Link expired</p>
          <h1>This download link has expired</h1>
          <p className="subtext">Please contact support with your payment email and payment screenshot.</p>
          <div className="cta-stack">
            <a className="btn btn-primary" href={`https://wa.me/${supportWhatsapp}`} target="_blank" rel="noopener noreferrer">Contact WhatsApp</a>
          </div>
        </div>
      </main>
    );
  }

  // FIX: Use atomic SQL function instead of read-then-write to avoid race conditions
  await supabaseAdmin.rpc("increment_download_count", { purchase_id: purchase.id });

  const downloadLinks = await Promise.all(
    files.map(async (file) => {
      const path = requiredEnv(file.envKey);
      const signedUrl = await createSignedUrl(path);
      return { ...file, signedUrl };
    })
  );

  return (
    <main className="section" style={{ maxWidth: 980 }}>
      <div className="success-box">
        <p className="pill">Secure download</p>
        <h1>Your {brand} is ready ✅</h1>
        <p className="subtext">
          These buttons create temporary secure links. Download and save the files now.
        </p>
        <p style={{ color: "#667085", fontSize: 13, marginTop: 10 }}>
          Purchase email: {purchase.email}
        </p>
      </div>

      <div className="download-grid">
        {downloadLinks.map((file) => (
          <article className="download-item" key={file.title}>
            <h3>{file.title}</h3>
            <p>{file.description}</p>
            {file.signedUrl ? (
              <a className="btn btn-primary" href={file.signedUrl} target="_blank" rel="noopener noreferrer" download={file.filename}>
                Download
              </a>
            ) : (
              <p className="error">File is not configured yet. Contact support.</p>
            )}
          </article>
        ))}
      </div>

      <div className="notice" style={{ marginTop: 20 }}>
        If any button does not work, message support with your payment email.
      </div>
    </main>
  );
}
