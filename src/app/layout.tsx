import Footer from "@/components/footer";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fake Reddit App",
  description: "Fake reddit App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
