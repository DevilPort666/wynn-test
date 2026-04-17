'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero({ heading, subheading, backgroundImage }: any) {
  const imageUrl = backgroundImage?.fields?.file?.url
    ? `https:${backgroundImage.fields.file.url}`
    : null;

  return (
    <section className="relative w-full aspect-video md:aspect-[4] overflow-hidden">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={heading || ''}
          fill
          priority
          className="object-cover object-[center_30%]"
        />
      )}

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-2xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-caslon mb-4"
          >
            {heading}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="text-lg md:text-xl"
          >
            {subheading}
          </motion.p>
        </div>
      </div>
    </section>
  );
}