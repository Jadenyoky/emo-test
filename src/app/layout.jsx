"use client";
import "./globals.css";
import AuthProvider from "@/lib/authProvider";
import QuizProvider from "@/lib/quizProvider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// export const metadata = {
//   title: "Emo Quiz App",
//   description: "",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    switch (pathname) {
      case "/":
        document.title = "Emo Quiz App";
        break;
      case "/signup":
        document.title = "Sign up";
        break;
      case "/login":
        document.title = "Login";
        break;
      case "/quiz":
        document.title = "Quiz";
        break;
      case "/result":
        document.title = "Result";
        break;
      default:
        document.title = "Emo Quiz App";
        break;
    }
  }, [pathname]);

  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* <meta name="theme-color" content="#84ccf8" />
        <meta name="background-color" content="#84ccf8" /> */}

        <title>Loading ...</title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Changa:wght@200..800&family=Space+Grotesk:wght@300..700&family=Unbounded:wght@200..900&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css"
        />
      </head>
      <body>
        <AuthProvider>
          <QuizProvider>{children}</QuizProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
