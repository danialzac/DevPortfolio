import "./globals.css";

export const metadata = {
  title: "Candidate Preparation Tracker",
  description: "A small learning app for reading a simple full-stack codebase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

