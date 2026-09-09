import "./globals.css";

export const metadata = {
  title: "Stopwatch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#101211] text-white antialiased">{children}</body>
    </html>
  );
}
