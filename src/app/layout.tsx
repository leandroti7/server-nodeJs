import "./globals.css";
import Header from "../components/header";
import {  Metadata } from "next";

export const metadata: Metadata = {
  title: "Poke Universe",
  description: "Poke Universe, o melhor lugar para assistir videos de pokemons",
  openGraph: {
    title: "Poke Universe",
    description: "Poke Universe - O melhor lugar para assistir videos de pokemons",
    siteName: "Poke Universe",
    locale: "pt-BR",
    type: "website",
  },
  icons: {
    icon: "/fav-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
