"use client";

import { motion } from "motion/react";
import { useTheme } from "@/context/ThemeContext";

export const Footer = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.3,
      },
    },
  };

  return (
    <footer
      className={`w-full py-12 ${
        theme === "dark" ? "bg-neutral-950" : "bg-[#FAF9F6]"
      }`}
    >
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={`w-full h-px ${
            theme === "dark" ? "bg-neutral-800" : "bg-neutral-200"
          }`} />
          {/* cspell: disable-next */}
          <motion.p
            className={`text-sm text-center ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            © {new Date().getFullYear()} Bishwash Chaudhari. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};
