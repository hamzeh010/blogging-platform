// layout.tsx
;
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
