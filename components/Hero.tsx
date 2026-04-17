'use client';

import { motion } from 'framer-motion';

export default function Hero({ heading, subheading, backgroundImage }: any) {
  const imageUrl = backgroundImage?.fields?.file?.url
    ? `https:${backgroundImage.fields.file.url}`
    : null;

  return (
    <section className="relative h-[60vh] flex items-center justify-center text-center">
      {/* Background */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={heading}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 text-white px-6">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-6xl font-caslon mb-4"
        >
          {heading}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-lg md:text-xl"
        >
          {subheading}
        </motion.p>
      </div>
    </section>
  );
}