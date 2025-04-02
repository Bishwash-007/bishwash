"use client";

import * as motion from "motion/react-client";
import { useState, useEffect } from "react";
import { personalDetails } from "@/constants";
import { ArrowRight, Download } from "lucide-react";
import Avatar from "./ui/Avatar";
import CustomButton from "./ui/Button";
import { useTheme } from "@/context/ThemeContext";

const words = ["Full Stack", "Web", "Mobile",""];

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-16 md:py-20 lg:py-24 ${
        theme === "dark" ? "bg-neutral-950" : "bg-[#FAF9F6]"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-12 lg:gap-16">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center md:text-left w-full md:w-auto px-4 sm:px-6 md:px-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className={`text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 md:mb-5 ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              variants={itemVariants}
            >
              Hi there! 👋 I&apos;m{" "}
              <span className={theme === "dark" ? "text-white" : "text-black"}>
                {personalDetails.name}
              </span>
            </motion.h1>

            <motion.div
              className={`text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 md:mb-5 h-[32px] sm:h-[50px] md:h-[60px] lg:h-[70px] xl:h-[80px] ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
              variants={itemVariants}
            >
              <motion.span
                key={currentWordIndex}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
                className="inline-block"
              >
                {words[currentWordIndex]} Developer
              </motion.span>
            </motion.div>

            <motion.p
              className={`text-base sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-6 md:mb-8 max-w-2xl mx-auto md:mx-0 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
              variants={itemVariants}
            >
              Turning coffee into code and ideas into reality!
              Let&apos;s build something amazing together.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-4 justify-center md:justify-start w-full sm:w-auto"
              variants={itemVariants}
            >
              <CustomButton
                Icon={ArrowRight}
                title="Let's Chat!"
                variant={theme === "dark" ? "secondary" : "primary"}
                size="md"
                href={`mailto:${personalDetails.email}`}
                className="w-full sm:w-auto"
              />
              <CustomButton
                Icon={Download}
                title="Get My CV"
                variant={theme === "dark" ? "secondary" : "primary"}
                size="md"
                className="w-full sm:w-auto"
              />
            </motion.div>
          </motion.div>
          {/* Images*/}
          <Avatar imageSrc="./images/me.jpg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
