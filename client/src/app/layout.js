import "./globals.css";

export const metadata = {
  title: "Grid Conquest | Real-time Shared Grid",
  description: "Capture cells on a live 20x20 grid with other players",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
