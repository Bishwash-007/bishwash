"use client";

import * as motion from "motion/react-client";
import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform } from "motion/react";
import { useTheme } from '@/context/ThemeContext';

interface TimelineEntry {
  year: string;
  title: string;
  content: React.ReactNode;
}

export const Experience = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 0.75], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      className={`w-full ${theme === 'dark' ? 'bg-neutral-950' : 'bg-[#FAF9F6]'} font-sans md:px-10`}
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div
        className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 text-center"
        variants={itemVariants}
      >
        <motion.h2
          className={`text-2xl sm:text-4xl lg:text-5xl mb-4 max-w-4xl mx-auto font-bold ${
            theme === 'dark' ? 'text-white' : 'text-black'
          }`}
          variants={itemVariants}
        >
          Changelog from my journey
        </motion.h2>
        <motion.p
          className={`text-base sm:text-lg max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
          }`}
          variants={itemVariants}
        >
          Here&apos;s a timeline of my journey.
        </motion.p>
      </motion.div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                ease: [0.21, 0.47, 0.32, 0.98],
                delay: index * 0.2,
              },
            }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div
                className={`h-10 absolute left-3 md:left-3 w-10 rounded-full ${
                  theme === 'dark' ? 'bg-black' : 'bg-white'
                } flex items-center justify-center`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className={`h-4 w-4 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-neutral-800 border-neutral-700' 
                    : 'bg-neutral-200 border-neutral-300'
                } border p-2`} />
              </motion.div>
              <motion.h3
                className={`hidden md:block text-xl md:pl-20 md:text-5xl font-bold ${
                  theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'
                }`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {item.year}
              </motion.h3>
            </div>

            <motion.div
              className="relative pl-20 pr-4 md:pl-4 w-full"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <motion.h3
                className={`md:hidden block text-2xl mb-4 text-left font-bold ${
                  theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'
                }`}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {item.year}
              </motion.h3>
              <motion.h2
                className={`text-2xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-neutral-500' : 'text-neutral-500'
                }`}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {item.title}
              </motion.h2>
              <motion.p
                className={`text-base md:text-lg ${
                  theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                {item.content}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
        <motion.div
          style={{
            height: height + "px",
          }}
          className={`absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] ${
            theme === 'dark' ? 'via-neutral-700' : 'via-neutral-200'
          } to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]`}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
