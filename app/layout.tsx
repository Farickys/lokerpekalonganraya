import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LokerPekalonganRaya – Lowongan Kerja Pekalongan, Batang & Pemalang",
  description: "Portal lowongan kerja terpercaya untuk area Pekalongan Raya: Kota Pekalongan, Kabupaten Pekalongan, Batang, dan Pemalang.",
  keywords: "loker pekalongan, lowongan kerja pekalongan, loker batang, loker pemalang",
  openGraph: {
    title: "LokerPekalonganRaya",
    description: "Portal lowongan kerja Pekalongan Raya",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
