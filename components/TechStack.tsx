"use client";

import { motion } from "motion/react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

const techStacks = [
  {
    name: "Next.js",
    logo: "./logos/nextjs.svg",
    alt: "Next.js Logo",
    darkModeClass: "brightness-0 invert",
    lightModeClass: "",
  },
  {
    name: "Expo",
    logo: "./logos/expo.svg",
    alt: "Expo Logo",
    darkModeClass: "brightness-0 invert",
    lightModeClass: "",
  },
  {
    name: "React",
    logo: "./logos/react.svg",
    alt: "React Logo",
    darkModeClass: "brightness-100 contrast-100",
    lightModeClass: "",
  },
  {
    name: "Flask",
    logo: "./logos/flask.svg",
    alt: "Flask Logo",
    darkModeClass: "brightness-0 invert",
    lightModeClass: "",
  },
  {
    name: "PyTorch",
    logo: "./logos/pytorch.svg",
    alt: "PyTorch Logo",
    darkModeClass: "brightness-100 contrast-100",
    lightModeClass: "brightness-100 contrast-100",
  },
  {
    name: "PostgreSQL",
    logo: "./logos/postgres.svg",
    alt: "PostgreSQL Logo",
    darkModeClass: "brightness-100 contrast-100",
    lightModeClass: "brightness-100 contrast-100",
  },
  {
    name: "Node.js",
    logo: "./logos/nodejs.svg",
    alt: "Node.js Logo",
    darkModeClass: "brightness-100 contrast-100",
    lightModeClass: "brightness-100 contrast-100",
  },
];

export const TechStack = () => {
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    },
    hover: {
      scale: 1.1,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8
      }
    }
  };

  const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 0.8,
        delay: 0.2
      }
    }
  };

  return (
    <section className={`w-full py-20 ${
      theme === "dark" ? "bg-neutral-950" : "bg-[#FAF9F6]"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === "dark" ? "text-white" : "text-neutral-900"
            }`}
            variants={titleVariants}
          >
            My Tech Arsenal 🛠️
          </motion.h2>
          <motion.p
            className={`text-lg max-w-2xl mx-auto ${
              theme === "dark" ? "text-neutral-400" : "text-neutral-600"
            }`}
            variants={descriptionVariants}
          >
            The tools and technologies I love working with to bring ideas to life 
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 sm:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {techStacks.map((tech) => (
            <motion.div
              key={tech.name}
              variants={itemVariants}
              whileHover="hover"
              className="group relative"
            >
              <motion.div 
                className="relative w-16 h-16 sm:w-16 sm:h-16"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Image
                  src={tech.logo}
                  alt={tech.alt}
                  fill
                  className={`object-contain transition-all duration-300 ${
                    theme === "dark" ? tech.darkModeClass : tech.lightModeClass
                  }`}
                  sizes="(max-width: 640px) 80px, 96px"
                />
              </motion.div>
              <motion.div 
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 5 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className={`text-sm font-medium whitespace-nowrap ${
                  theme === "dark" ? "text-white" : "text-neutral-900"
                }`}>
                  {tech.name}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
