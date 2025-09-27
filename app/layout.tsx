"use client"

import { useEffect, useState } from "react";

import "./globals.css";

export default function Layout(props: {
  children: React.ReactNode;
}) {
  const { children } = props;

  const [lang, setLang] = useState('fr');

  useEffect(() => {
    const userLang = navigator.language || navigator.languages[0];
    if (userLang.startsWith('fr')) {
      setLang('fr');
    } else {
      setLang('en');
    }
  }, []);

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
