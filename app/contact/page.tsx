import type { Metadata } from 'next';
import { Suspense } from 'react';
import ContactForm from './ContactForm';
import ContactMessage from './ContactMessage';

import "./contact.css";

export async function generateStaticParams() {
  return {}
}

export const metadata: Metadata = {
  title: 'Adrian Pothuaud | Portfolio | Contact',
  description: 'Contact Me',
};

export default function Contact() {
  return (
    <>
      <header>
        <ul className="breadcrumb">
          <li><a href="/">Home</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </header>

      <main>
        <div className="hero">
          <h1>Feel free to reach out!</h1>
          <p>I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.</p>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ContactMessage />
        </Suspense>

        <ContactForm />
      </main>

      <footer>
        <p>Made with ❤️ by Adrian Pothuaud</p>
      </footer>
    </>
  );
}
