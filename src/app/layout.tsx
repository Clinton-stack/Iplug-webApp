import type { Metadata } from "next";
import { DM_Sans, Mulish } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import ClientOnly from "@/components/ClientOnly";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

interface RootLayoutProps {
  children: React.ReactNode;
}

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const mulish = Mulish({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-mulish",
});

export const metadata: Metadata = {
  title: "Ingenious Plug – Your Smart Plug into Trusted Services",
  description:
    "Connect with verified service providers instantly. Ingenious Plug makes it seamless to hire, deliver, and manage trusted services across Nigeria.",
  metadataBase: new URL("https://iplug-website.vercel.app"),
  openGraph: {
    title: "Ingenious Plug",
    description:
      "Trusted platform for hiring and delivering services. Powered by Ingenious Technology.",
    url: "https://iplug-website.vercel.app",
    siteName: "Ingenious Plug",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ingenious Plug – Trusted Services Marketplace",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ingenious Plug",
    description:
      "Connect with service providers and professionals easily with Ingenious Plug.",
    site: "@Ingeniousplug",
    images: ["/og-image.png"],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${mulish.variable}`} suppressHydrationWarning>
        <ClientOnly 
          fallback={
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, #3BA3F5 0%, #197FCF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              zIndex: 9999
            }}>
              <img 
                src="/images/IngeniousplugLogo.png" 
                alt="Ingenious Plug Logo" 
                style={{ 
                  maxHeight: '100px', 
                  maxWidth: '250px', 
                  marginBottom: '30px',
                  filter: 'brightness(0) invert(1)'
                }}
              />
              <div className="spinner" />
              <p style={{
                color: 'white',
                marginTop: '20px',
                fontSize: '16px',
                fontWeight: '500',
                textAlign: 'center'
              }}>
                Loading Ingenious Plug...
              </p>
            </div>
          }
        >
          <Provider>
            {children}
          </Provider>
        </ClientOnly>
      </body>
    </html>
  );
}
