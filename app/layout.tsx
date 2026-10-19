import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyQuest",
  description:
    "StudyQuest is a student-built learning game designed to make studying more engaging through practice and gameplay.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
