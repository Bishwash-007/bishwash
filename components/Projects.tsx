"use client";

import { motion } from "motion/react";
import { Card } from "./Card";
import { useTheme } from '@/context/ThemeContext';

interface Project {
  title: string;
  description: string;
  github: string;
  tech: string[];
  category: string;
  image: string;
}

interface ProjectsProps {
  data: Project[];
}

export const Projects = ({ data }: ProjectsProps) => {
  const { theme } = useTheme();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
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
      },
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
      theme === 'dark' ? 'bg-neutral-950' : 'bg-[#FAF9F6]'
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
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}
            variants={titleVariants}
          >
            Cool Stuff I&apos;ve Built
          </motion.h2>
          <motion.p
            className={`text-lg max-w-2xl mx-auto ${
              theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
            }`}
            variants={descriptionVariants}
          >
            A collection of projects that showcase my passion for creating awesome digital experiences
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {data.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover="hover"
              className="h-full"
            >
              <Card 
                {...project} 
                image={project.image || "/logos/placeholder.svg"}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
