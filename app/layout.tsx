import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokemon Explorer",
  description: "A Pokemon Explorer web app built with Next.js and PokeAPI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold text-red-600 hover:text-red-700">
              Pokemon Explorer
            </Link>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500">
          <p>Pokemon Explorer &bull; Powered by PokeAPI</p>
        </footer>
      </body>
    </html>
  );
}
