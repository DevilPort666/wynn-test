'use client';

import { motion } from 'framer-motion';

type PromoProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  image?: any;
  imagePosition?: 'left' | 'right';
};

export default function Promo({
  title,
  description,
  ctaLabel,
  ctaUrl,
  image,
  imagePosition,
}: PromoProps) {
  const imageUrl = image?.fields?.file?.url
    ? `https:${image.fields.file.url}`
    : null;

  const isRight = imagePosition === 'right';

  return (
    <section
      className={`flex flex-col container mx-auto max-w-7xl md:flex-row items-center gap-8 px-6 py-12 ${
        isRight ? 'md:flex-row-reverse' : ''
      }`}
    >
      {imageUrl && (
        <motion.img
          src={imageUrl}
          alt={title || ''}
          className="w-full md:w-1/2 rounded"
          initial={{ opacity: 0, x: isRight ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
      )}

      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: isRight ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
      >
        {title && (
          <motion.h2
            className="text-2xl font-semibold mb-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
          </motion.h2>
        )}

        {description && (
          <motion.p
            className="mb-4 text-gray-600 font-avenir tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {description}
          </motion.p>
        )}

        {ctaUrl && ctaLabel && (
          <motion.a
            href={ctaUrl}
            className="inline-block bg-black text-white px-4 py-2 rounded font-avenir"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {ctaLabel}
          </motion.a>
        )}
      </motion.div>
    </section>
  );
}