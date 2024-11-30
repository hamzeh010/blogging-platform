// layout.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import navigationLinks from "../utils/const/navigationLinks";

import "./globals.css";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <Header
        logoSrc="/"
        logoImage="https://flowbite.com/docs/images/logo.svg"
        logoAlt="Flowbite Logo"
        companyName="Avartra Blogs"
        loginLink="/login"
        navigationLinks={navigationLinks}
        myBlogLink="/create-blog"
      />
      <main className="flex-1">{children}</main>
      <Footer companyName="Avartra" year={2024} />
    </div>
  );
}
