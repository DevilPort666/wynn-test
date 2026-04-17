'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type HeaderProps = {
  logo?: any;
  siteName?: string;
  navigation?: {
    fields?: {
      items?: string[];
    };
  };
};

export default function Header({ logo, navigation }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const logoUrl = logo?.fields?.file?.url
    ? `https:${logo.fields.file.url}`
    : null;

  const items = (navigation?.fields?.items || []).map((raw) => {
    const [label, href] = raw.split('|');
    return { label: label?.trim() ?? raw, href: href?.trim() ?? '/' };
  });

  return (
    <header className="px-6 py-4 border-b font-avenir relative">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logoUrl && (
            <Link href="/" className="block">
              <img
                src={logoUrl}
                alt="logo"
                className="h-12 w-auto cursor-pointer"
              />
            </Link>
          )}
        </div>

        <nav className="hidden md:flex gap-6">
          {items.map(({ label, href }, i) => (
            <Link
              key={i}
              href={href}
              className="text-sm hover:underline font-avenir"
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
              fill="#000"
            />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-50"
          >
            <div className="flex flex-col items-center gap-6 py-6">
              {items.map(({ label, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-avenir hover:opacity-70 transition"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}