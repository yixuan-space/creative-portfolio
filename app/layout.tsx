import type { Metadata } from "next";
import "./globals.css";

const themeInitScript = `
(() => {
  const storageKey = "portfolio-theme";
  const savedTheme = window.localStorage.getItem(storageKey);
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const theme = savedTheme || (preferredDark ? "dark" : "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
})();
`;

export const metadata: Metadata = {
  title: "Lin | Photographer",
  description: "光线、空间、人与片刻。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
