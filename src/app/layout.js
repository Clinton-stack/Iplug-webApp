import { DM_Sans, Mulish } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/ui/provider";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';


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

export const metadata = {
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
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="debug-hydration" style={{colorScheme:"light"}}>
      <body className={`${dmSans.variable} ${mulish.variable}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
