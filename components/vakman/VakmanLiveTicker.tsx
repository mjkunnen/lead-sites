'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SiteContent } from '@/lib/types';
import { t } from '@/lib/i18n';

export default function VakmanLiveTicker({ content }: { content: SiteContent }) {
  const tr = t(content.lang);
  const totalReviews = content.stats?.reviews_count ?? content.reviews.length;
  const messages = [
    `⭐ ${totalReviews} ${tr.vakman.tickerClients} ${content.contact.city}`,
    `📞 ${tr.vakman.tickerResponse}`,
    `✅ ${tr.vakman.tickerQuote}`,
    `🔧 ${content.stats?.projects ?? 100}+ ${tr.vakman.tickerProjects}`,
    `📍 ${tr.vakman.tickerActive} ${content.contact.city} ${tr.vakman.tickerArea}`,
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setIndex((i) => (i + 1) % messages.length), 3500);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="bg-[#004ac6] py-2.5 overflow-hidden">
      <div className="flex items-center justify-center h-5">
        <AnimatePresence mode="wait">
          <motion.span
            key={messages[index]}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white text-xs font-semibold tracking-wide"
          >
            {messages[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
