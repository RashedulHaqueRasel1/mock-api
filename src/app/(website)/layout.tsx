import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Mock API",
  description:
    "Mock API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>

      {children}

    </>
  );
}
