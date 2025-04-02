"use client";
import { motion } from "motion/react";
import { Github } from "lucide-react";
import Image from "next/image";
import { useTheme } from '@/context/ThemeContext';

interface CardProps {
  title: string;
  description: string;
  github: string;
  tech: string[];
  image: string;
  index: number;
}

export const Card = ({ title, description, github, tech, image, index }: CardProps) => {
  const { theme } = useTheme();

  const cardVariants = {
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
        mass: 0.8,
        delay: index * 0.1
      }
    },
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 10 },
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
    <motion.div
      className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border ${
        theme === 'dark' 
          ? 'bg-neutral-900 border-neutral-800' 
          : 'bg-[#FAF9F6] border-neutral-200'
      }`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.div 
        className="relative h-48 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800"
        variants={imageVariants}
      >
        <Image
          src={image || "/logos/placeholder.svg"}
          alt={title}
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>

      <motion.div 
        className="p-6"
        variants={contentVariants}
      >
        <motion.h3
          className={`text-2xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-neutral-900'
          }`}
          whileHover={{ x: 5 }}
        >
          {title}
        </motion.h3>
        <motion.p
          className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          {description}
        </motion.p>

        <motion.div
          className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4"
          variants={contentVariants}
        >
          {tech.map((tech, index) => (
            <motion.span
              key={index}
              className={`px-1.5 sm:px-2 py-1 text-sm rounded-md border ${
                theme === 'dark'
                  ? 'bg-neutral-800 text-white border-neutral-700'
                  : 'bg-neutral-100 text-neutral-900 border-neutral-200'
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 sm:gap-2 transition-colors ${
            theme === 'dark'
              ? 'text-white hover:text-neutral-300'
              : 'text-neutral-900 hover:text-neutral-600'
          }`}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.95 }}
          variants={contentVariants}
        >
          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>View on GitHub</span>
        </motion.a>
      </motion.div>
    </motion.div>
  );
}; 