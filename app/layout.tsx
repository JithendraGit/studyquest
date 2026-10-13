import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyQuest — Make the next step feel possible",
  description:
    "StudyQuest is a student-built educational game project exploring how game-inspired progression can make studying feel more approachable.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
