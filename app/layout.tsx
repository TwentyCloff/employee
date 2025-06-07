import { ThemeProvider } from "@/providers/theme-provider";
import type { Metadata } from "next";
import "./globals.css";
import { geistMono, inter } from "@/lib/fonts";
import { SideNav } from "@/components/dashboard/SideNav";
import { MainContent } from "@/components/dashboard/MainContent";

export const metadata: Metadata = {
  title: "Employee Performance Evaluation",
  description: "AI Mini Project",
  icons: {
    icon: "/window.svg",
  },
  themeColor: "#000000",
  openGraph: {
    title: "Employee Performance Evaluation",
    description: "AI Mini Project",
    url: "https://employee-performance-evaluation-beta.vercel.app/",
    siteName: "Employee Performance Evaluation",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex">
            <SideNav />
            <MainContent>
              {children}
            </MainContent>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
